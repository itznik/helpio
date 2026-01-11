import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();

// This secret comes from your Stripe Dashboard -> Developers -> Webhooks
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature') as string;

  let event: Stripe.Event;

  // 1. VERIFY SIGNATURE (Security)
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  // 2. HANDLE EVENTS
  const session = event.data.object as Stripe.PaymentIntent;

  if (event.type === 'payment_intent.succeeded') {
    console.log('💰 Payment Succeeded:', session.id);
    
    // Extract metadata we saved during checkout
    const { wishId, userId, tipAmount, taxAmount, isAnonymous } = session.metadata;
    const totalAmount = session.amount / 100; // Convert cents to dollars

    try {
      // A. RECORD THE TRANSACTION
      const donation = await prisma.donation.create({
        data: {
          transactionId: session.id,
          amountTotal: totalAmount,
          amountToWish: totalAmount - (parseFloat(tipAmount || '0') + parseFloat(taxAmount || '0')),
          amountTip: parseFloat(tipAmount || '0'),
          wishId: wishId,
          donorId: userId !== 'undefined' ? userId : null, // Handle anonymous donors
          status: 'succeeded',
          paymentGateway: 'stripe',
          isAnonymous: isAnonymous === 'true',
        },
      });

      // B. UPDATE THE WISH (Add to raised amount)
      // We use atomic increment to prevent race conditions
      await prisma.wish.update({
        where: { id: wishId },
        data: {
          raisedAmount: {
            increment: donation.amountToWish,
          },
        },
      });

      console.log('✅ Database Updated for Donation:', donation.id);

      // C. CHECK IF FUNDED
      // If raised >= goal, mark as FUNDED automatically
      const updatedWish = await prisma.wish.findUnique({ where: { id: wishId } });
      if (updatedWish && updatedWish.raisedAmount >= updatedWish.goalAmount) {
         await prisma.wish.update({
            where: { id: wishId },
            data: { status: 'FUNDED' }
         });
         // TODO: Send email to Wish Creator here
      }

    } catch (error) {
      console.error('Database Update Failed:', error);
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
