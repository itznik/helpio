import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Assuming you set this up in previous step
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, title, category, amount, description } = body;

    // 1. BUSINESS LOGIC: Calculate Fee
    const goal = parseFloat(amount);
    let feeRequired = false;
    let feeAmount = 0;

    if (goal > 100) {
      feeRequired = true;
      feeAmount = goal > 500 ? 5.00 : 1.00;
    }

    // 2. CREATE DRAFT IN DB
    const wish = await prisma.wish.create({
      data: {
        userId,
        title,
        description,
        category,
        goalAmount: goal,
        status: feeRequired ? 'PENDING_PAYMENT' : 'PENDING_REVIEW', // The Core Logic
        listingFeePaid: !feeRequired,
      }
    });

    // 3. IF FEE REQUIRED: Generate Stripe Checkout Session (Mocked here)
    let paymentUrl = null;
    if (feeRequired) {
      // paymentUrl = await createStripeSession(feeAmount, wish.id);
      paymentUrl = `/payment/fee/${wish.id}`; // Internal redirect for now
    }

    return NextResponse.json({ 
      success: true, 
      wishId: wish.id,
      redirect: paymentUrl || '/dashboard/wishes' 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
