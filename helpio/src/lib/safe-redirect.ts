export function getSafeRedirect(url: string | null, defaultPath: string = '/dashboard'): string {
  if (!url) return defaultPath;

  // 1. Check if it's a relative path (starts with /)
  if (url.startsWith('/') && !url.startsWith('//')) {
    return url;
  }

  // 2. Check if it's an absolute URL to OUR domain
  try {
    const urlObj = new URL(url);
    const originUrl = new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000');
    
    if (urlObj.origin === originUrl.origin) {
      return urlObj.pathname + urlObj.search;
    }
  } catch (e) {
    // Invalid URL
  }

  // 3. Fallback if unsafe
  return defaultPath;
}
