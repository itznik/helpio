import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, tipAmount, wishId, userId, type } = body; 
    // Type can be 'DONATION' or 'VERIFICATION_FEE'

    // 1. Calculate Total (in cents for Stripe)
    // If it's a verification fee, amount is fixed (e.g., $1.00)
    // If it's a donation, it's Base + Tip
    
    let totalAmount = 0;
    let metadata = {};

    if (type === 'VERIFICATION_FEE') {
       totalAmount = 100; // $1.00 = 100 cents
       metadata = { type: 'VERIFICATION_FEE', wishId, userId };
    } else {
       // Donation Logic
       const base = parseFloat(amount) * 100;
       const tip = parseFloat(tipAmount || '0') * 100;
       totalAmount = Math.round(base + tip);
       
       metadata = { 
         type: 'DONATION', 
         wishId, 
         userId, 
         donationAmount: base, 
         tipAmount: tip 
       };
    }

    // 2. Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: metadata, // Important: This lets us track what the money was for later via Webhooks
    });

    return NextResponse.json({ 
      clientSecret: paymentIntent.client_secret 
    });

  } catch (error) {
    console.error('Stripe Error:', error);
    return NextResponse.json({ error: 'Payment initialization failed' }, { status: 500 });
  }
}
