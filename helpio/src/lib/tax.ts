// Mock Tax Rates per Country Code (ISO 3166-1 alpha-2)
export const TAX_RATES: Record<string, number> = {
  US: 0.08, // 8% Average
  IN: 0.18, // 18% GST
  GB: 0.20, // 20% VAT
  CA: 0.13, // 13% HST
  AU: 0.10, // 10% GST
  DE: 0.19, // 19% VAT
  // Default fallback
  DEFAULT: 0.05, 
};

export function calculateTax(amount: number, country: string) {
  const rate = TAX_RATES[country] || TAX_RATES.DEFAULT;
  return Number((amount * rate).toFixed(2));
}

export const COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
];
