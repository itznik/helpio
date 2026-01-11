import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { checkoutSchema } from '@/lib/validations';
import { calculateTax } from '@/lib/tax';
import { rateLimit, RateLimitResponse } from '@/lib/rate-limit'; // From previous step
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    // 1. SECURITY: Rate Limiting
    const ip = headers().get('x-forwarded-for') || '127.0.0.1';
    if (!rateLimit(ip, 5)) { // Max 5 attempts per minute
      return RateLimitResponse();
    }

    const body = await request.json();

    // 2. SECURITY: Input Validation (Zod)
    const validation = checkoutSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Invalid payment data", details: validation.error.format() }, { status: 400 });
    }

    const { amount, tipAmount, country, wishId, isAnonymous } = validation.data;

    // 3. LOGIC: Server-Side Calculation (The Source of Truth)
    // We never trust the 'total' sent from frontend. We recalculate it.
    
    // Tax Logic: Usually tax applies to the Service/Tip or Goods. 
    // For this hybrid model, we'll apply tax to the whole transaction for safety, 
    // or you can change this to `calculateTax(tipAmount, country)` if donations are tax-exempt.
    const tax = calculateTax(amount + tipAmount, country);
    
    const totalAmount = Math.round((amount + tipAmount + tax) * 100); // Convert to cents

    // 4. STRIPE: Create Secure Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        wishId,
        baseAmount: amount,
        tipAmount: tipAmount,
        taxAmount: tax,
        country,
        isAnonymous: isAnonymous ? 'true' : 'false',
        ip_hash: Buffer.from(ip).toString('base64').substring(0, 10) // Security Audit Trail
      },
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret,
      breakdown: {
        amount,
        tip: tipAmount,
        tax,
        total: totalAmount / 100
      }
    });

  } catch (error) {
    console.error('Payment Security Error:', error);
    return NextResponse.json({ error: 'Secure transaction initialization failed' }, { status: 500 });
  }
}
