import { NextResponse } from 'next/server';

const ipMap = new Map<string, { count: number; lastReset: number }>();

export function rateLimit(ip: string, limit: number = 10, windowMs: number = 60000) {
  const now = Date.now();
  const record = ipMap.get(ip) || { count: 0, lastReset: now };

  // Reset window if time passed
  if (now - record.lastReset > windowMs) {
    record.count = 0;
    record.lastReset = now;
  }

  // Check limit
  if (record.count >= limit) {
    return false; // Block request
  }

  // Increment
  record.count++;
  ipMap.set(ip, record);
  return true; // Allow request
}

export function RateLimitResponse() {
    return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
    );
}
