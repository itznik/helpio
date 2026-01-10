import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Map countries to currencies
const CURRENCY_MAP: Record<string, string> = {
  US: 'USD',
  IN: 'INR',
  GB: 'GBP',
  EU: 'EUR',
  // Default fallback
  DEFAULT: 'USD'
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // 1. GEO-DETECTION (Vercel/Next.js Logic)
  const country = request.geo?.country || request.headers.get('x-vercel-ip-country') || 'US';
  const currency = CURRENCY_MAP[country] || CURRENCY_MAP.DEFAULT;

  // 2. SECURITY HEADERS (High-End Encryption Standards)
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');

  // 3. INJECT LOCALIZATION (Pass to frontend via headers)
  response.headers.set('x-user-country', country);
  response.headers.set('x-user-currency', currency);

  return response;
}

// Apply to all API and Page routes
export const config = {
  matcher: '/:path*',
};
