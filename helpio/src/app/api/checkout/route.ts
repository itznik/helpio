import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { checkoutSchema } from '@/lib/validations';
import { calculateTax } from '@/lib/tax';
import { rateLimit, RateLimitResponse } from '@/lib/rate-limit';
import { headers } from 'next/headers';

export async function POST(request: Request) {
  try {
    const ip = headers().get('x-forwarded-for') || '127.0.0.1';
    
    // 1. Rate Limiting
    if (!rateLimit(ip, 10)) { 
      return RateLimitResponse();
    }

    const body = await request.json();
    console.log("Payment Request Body:", body); // DEBUG LOG

    // 2. Validation
    const validation = checkoutSchema.safeParse(body);
    if (!validation.success) {
      console.error("Validation Error:", validation.error.format()); // DEBUG LOG
      return NextResponse.json({ 
        error: "Invalid payment data", 
        details: validation.error.format() 
      }, { status: 400 });
    }

    const { amount, tipAmount, country, wishId, isAnonymous } = validation.data;

    // 3. Tax & Total Calculation
    // Ensure we handle cases where tax calculation might fail
    const tax = calculateTax(amount + tipAmount, country) || 0;
    const totalAmount = Math.round((amount + tipAmount + tax) * 100);

    // 4. Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: {
        wishId: wishId || 'general_fund',
        baseAmount: amount,
        tipAmount: tipAmount,
        taxAmount: tax,
        country,
        isAnonymous: isAnonymous ? 'true' : 'false',
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

  } catch (error: any) {
    console.error('Stripe/Server Error:', error);
    return NextResponse.json({ error: error.message || 'Payment init failed' }, { status: 500 });
  }
}
