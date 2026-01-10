import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, title, description, goalAmount, category } = body;

    // 1. SECURITY CHECK: Does this user exist?
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. BUSINESS LOGIC: Determine Status based on "Skin in the Game"
    let initialStatus = 'PENDING_REVIEW';
    if (parseFloat(goalAmount) > 500) {
      initialStatus = 'PENDING_PAYMENT'; 
    }

    // 3. DATABASE: Create the record securely
    const wish = await prisma.wish.create({
      data: {
        userId,
        title,
        description,
        goalAmount,
        category,
        status: initialStatus as any, // TypeScript cast to Enum
      },
    });

    return NextResponse.json({ success: true, wish });

  } catch (error) {
    console.error('Wish Creation Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
