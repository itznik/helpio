import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // 1. Initialize Response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Create Supabase Client (Secure Session Handling)
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

  const { data: { user } } = await supabase.auth.getUser();

  // 3. Route Protection Logic
  const isAuthRoute = request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/create');
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isAuthRoute && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    return NextResponse.redirect(redirectUrl);
  }

  // 3.1 Strict Admin Protection (Role Check)
  if (isAdminRoute) {
    if (!user || user.user_metadata.role !== 'ADMIN') {
      // Log this attempt for security audit
      console.warn(`[SECURITY] Unauthorized Admin Access Attempt by ${user?.email || 'Anonymous'} from ${request.ip}`);
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/dashboard'; 
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 4. Geo-Detection
  const country = request.geo?.country || 'US';
  response.headers.set('x-user-country', country);

  // 5. SECURITY HEADERS (The "Iron Dome")
  
  // Nonce generation for scripts (Advanced XSS protection)
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://maps.googleapis.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://i.pravatar.cc https://images.unsplash.com https://*.supabase.co https://*.stripe.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://*.supabase.co https://api.stripe.com https://maps.googleapis.com;
    frame-src 'self' https://js.stripe.com https://hooks.stripe.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `;

  response.headers.set('Content-Security-Policy', cspHeader.replace(/\s{2,}/g, ' ').trim());
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'DENY'); // Prevents Clickjacking
  response.headers.set('X-Content-Type-Options', 'nosniff'); // Prevents MIME sniffing
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), interest-cohort=()');

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
