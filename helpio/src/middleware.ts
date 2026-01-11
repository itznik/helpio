import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 1. Initialize Response
  // We start with a default response that we might modify later (cookies/headers)
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Create Supabase Client
  // This is critical for refreshing the session token on the server side
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // 3. Check Authentication Status
  // getUser() is safer than getSession() as it validates the token against the database
  const { data: { user } } = await supabase.auth.getUser();

  // 4. Define Route Categories
  const path = request.nextUrl.pathname;
  
  const isProtectedRoute = path.startsWith('/dashboard') || 
                           path.startsWith('/create') || 
                           path.startsWith('/admin') ||
                           path.startsWith('/settings');

  const isAuthPage = path.startsWith('/login') || 
                     path.startsWith('/signup') || 
                     path.startsWith('/forgot-password');

  const isAdminRoute = path.startsWith('/admin');

  // 5. Auth Logic (The Redirection Rules)

  // Rule A: If trying to access a protected route without being logged in -> Redirect to Login
  if (isProtectedRoute && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('next', path); // Remember where they wanted to go
    return NextResponse.redirect(redirectUrl);
  }

  // Rule B: If trying to access Login/Signup while ALREADY logged in -> Redirect to Dashboard
  if (isAuthPage && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/dashboard';
    return NextResponse.redirect(redirectUrl);
  }

  // Rule C: Strict Admin Protection
  if (isAdminRoute) {
    if (!user || user.user_metadata.role !== 'ADMIN') {
      console.warn(`[SECURITY] Unauthorized Admin Access Attempt by ${user?.email || 'Anonymous'} from ${request.ip}`);
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/dashboard'; 
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 6. Geo-Detection (Optional feature for localization)
  const country = request.geo?.country || 'US';
  response.headers.set('x-user-country', country);

  // 7. SECURITY HEADERS (The "Iron Dome")
  // Configured to allow Supabase, Stripe, Google Fonts, Unsplash, and UI Avatars
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://maps.googleapis.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://i.pravatar.cc https://images.unsplash.com https://ui-avatars.com https://*.supabase.co https://*.stripe.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.supabase.co https://api.stripe.com https://maps.googleapis.com https://ipapi.co;
    frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `;

  // Apply Security Headers
  response.headers.set('Content-Security-Policy', cspHeader.replace(/\s{2,}/g, ' ').trim());
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'DENY'); 
  response.headers.set('X-Content-Type-Options', 'nosniff'); 
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

  return response;
}

export const config = {
  // Matcher excludes static files, images, and the auth callback route (to prevent loops)
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
