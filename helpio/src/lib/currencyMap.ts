// src/lib/currencyMap.ts

export const COUNTRY_TO_CURRENCY: Record<string, string> = {
  US: 'USD', // United States
  IN: 'INR', // India
  GB: 'GBP', // United Kingdom
  EU: 'EUR', // Europe (Generic)
  DE: 'EUR', // Germany
  FR: 'EUR', // France
  IT: 'EUR', // Italy
  ES: 'EUR', // Spain
  NL: 'EUR', // Netherlands
  CA: 'CAD', // Canada
  AU: 'AUD', // Australia
  JP: 'JPY', // Japan
  CN: 'CNY', // China
  BR: 'BRL', // Brazil
  AE: 'AED', // UAE
  SA: 'SAR', // Saudi Arabia
  RU: 'RUB', // Russia
  ZA: 'ZAR', // South Africa
  NZ: 'NZD', // New Zealand
  SG: 'SGD', // Singapore
  HK: 'HKD', // Hong Kong
  KR: 'KRW', // South Korea
  MX: 'MXN', // Mexico
  // Fallback for others to USD if needed, or add more as you scale
};

// Helper to get currency symbol if Intl fails
export const getCurrencySymbol = (currency: string) => {
  try {
    return (0).toLocaleString('en-US', { style: 'currency', currency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/\d/g, '').trim();
  } catch (e) {
    return currency; // Fallback to code (e.g. "USD")
  }
};
