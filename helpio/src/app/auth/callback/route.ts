import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  
  if (code) {
    const cookieStore = cookies();
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    
    // Exchange the code for a session
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && session?.user) {
      // SYNC USER TO PRISMA DB
      const existingUser = await prisma.user.findUnique({
        where: { id: session.user.id }
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            id: session.user.id,
            email: session.user.email!,
            fullName: session.user.user_metadata.full_name || 'New User',
            avatarUrl: session.user.user_metadata.avatar_url,
          }
        });
      }
    }
  }

  // Redirect to Dashboard
  return NextResponse.redirect(`${origin}/dashboard`);
}
