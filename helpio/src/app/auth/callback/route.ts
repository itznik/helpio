import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    
    // 1. Exchange Code for Session
    const { data: { session } } = await supabase.auth.exchangeCodeForSession(code);

    if (session?.user) {
      // 2. SYNC USER TO PRISMA DB
      // We check if user exists. If not, create them.
      const existingUser = await prisma.user.findUnique({
        where: { id: session.user.id } // Supabase ID matches Prisma ID
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            id: session.user.id,
            email: session.user.email!,
            fullName: session.user.user_metadata.full_name || 'New User',
            avatarUrl: session.user.user_metadata.avatar_url,
            // Country/Currency will be detected by middleware later
          }
        });
      }
    }
  }

  // 3. Redirect to Dashboard
  return NextResponse.redirect(new URL('/dashboard', request.url));
}
