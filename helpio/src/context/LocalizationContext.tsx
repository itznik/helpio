'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

// Simplified Exchange Rates (In production, fetch this from an API like open.er-api.com)
// We default to 1 for USD.
const MOCK_RATES: Record<string, number> = {
  USD: 1,
  INR: 83.5,
  EUR: 0.92,
  GBP: 0.79,
  CAD: 1.35,
  AUD: 1.52,
  JPY: 150.2,
};

interface LocalizationState {
  country: string;
  currency: string;
  exchangeRate: number;
  formatPrice: (amountInUSD: number) => string;
}

const LocalizationContext = createContext<LocalizationState | undefined>(undefined);

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const [country, setCountry] = useState('US');
  const [currency, setCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    // 1. Detect Country/Currency from Middleware Headers (passed via HTML)
    // Or do a client-side fallback fetch
    const detectLocation = async () => {
      try {
        // Fallback: Use a free IP API if middleware header is missing
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        
        if (data.country_code && data.currency) {
          setCountry(data.country_code);
          setCurrency(data.currency);
          
          // Set Exchange Rate (Mock logic for demo, replace with API fetch)
          const rate = MOCK_RATES[data.currency] || 1; // Default to USD parity if unknown
          setExchangeRate(rate);
        }
      } catch (e) {
        console.warn("Location detection failed, defaulting to USD");
      }
    };

    detectLocation();
  }, []);

  // Performance Optimization: Memoize the formatter to prevent re-creation
  const formatPrice = React.useCallback((amountInUSD: number) => {
    const converted = amountInUSD * exchangeRate;
    
    return new Intl.NumberFormat(country === 'US' ? 'en-US' : country, {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0, // Cleaner look (no cents for big numbers)
    }).format(converted);
  }, [country, currency, exchangeRate]);

  return (
    <LocalizationContext.Provider value={{ country, currency, exchangeRate, formatPrice }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) throw new Error('useLocalization must be used within a LocalizationProvider');
  return context;
};
