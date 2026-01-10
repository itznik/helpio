import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // 1. Refresh Session
  const { data: { session } } = await supabase.auth.getSession();

  // 2. Route Protection Logic
  const isAuthRoute = req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/create');
  
  if (isAuthRoute && !session) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 3. Keep our previous Geo-Detection Logic
  // (Merge with previous middleware code here or chain them)
  const country = req.geo?.country || 'US';
  res.headers.set('x-user-country', country);

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/create/:path*', '/api/:path*'],
};
