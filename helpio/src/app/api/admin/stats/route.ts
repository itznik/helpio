import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { stripe } from '@/lib/stripe'; // To get real balance

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 1. Fetch DB Stats
    const totalUsers = await prisma.user.count();
    const pendingWishes = await prisma.wish.count({ where: { status: 'PENDING_REVIEW' } });
    
    // 2. Fetch Financials (Real Balance from Stripe)
    const balance = await stripe.balance.retrieve();
    const available = balance.available[0].amount / 100; // Convert cents to dollars
    const pending = balance.pending[0].amount / 100;

    // 3. Aggregate Revenue (From our DB transaction logs)
    // In a real app, you'd use a sum aggregate query here
    
    return NextResponse.json({
      users: totalUsers,
      wishes: {
        pending: pendingWishes,
      },
      financials: {
        available: available,
        pending: pending,
        currency: balance.available[0].currency
      }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch admin stats' }, { status: 500 });
  }
}
