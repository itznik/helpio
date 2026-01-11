'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { countries } from 'country-list-json'; 

// In a real production app, you should fetch live rates from an API (e.g., OpenExchangeRates).
// For this hybrid model, we use estimated parity rates.
const ESTIMATED_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.50,
  CAD: 1.35,
  AUD: 1.52,
  JPY: 150.20,
  CNY: 7.20,
  AED: 3.67,
  BRL: 4.95,
  // Add fallback for others or fetch dynamically
};

interface LocalizationState {
  countryCode: string; // ISO 2-letter (e.g., 'IN', 'US')
  currencyCode: string; // ISO 3-letter (e.g., 'INR', 'USD')
  exchangeRate: number;
  flag: string;
  formatPrice: (amountInUSD: number) => string;
  setCountryOverride: (code: string) => void;
}

const LocalizationContext = createContext<LocalizationState | undefined>(undefined);

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const [countryCode, setCountryCode] = useState('US');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [flag, setFlag] = useState('🇺🇸');

  // 1. Initial Detection (Runs once on mount)
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // We use a lightweight public API for detection. 
        // In production, rely on 'x-vercel-ip-country' header if hosting on Vercel.
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();

        if (data.country_code && data.currency) {
          updateContext(data.country_code, data.currency);
        }
      } catch (error) {
        console.warn('Auto-detection failed, falling back to US defaults.');
      }
    };

    detectLocation();
  }, []);

  // 2. Helper to update state based on Country Code
  const updateContext = (cCode: string, currCode?: string) => {
    // Find country data from the library
    const countryData = (countries as any[]).find((c: any) => c.code === cCode);
    
    // Determine Currency
    const targetCurrency = currCode || (countryData ? countryData.currency : 'USD'); 
    
    // Determine Rate
    const rate = ESTIMATED_RATES[targetCurrency] || 1; 

    // Determine Flag (Emoji Logic)
    const flagEmoji = cCode.toUpperCase().replace(/./g, char => 
      String.fromCodePoint(char.charCodeAt(0) + 127397)
    );

    setCountryCode(cCode);
    setCurrencyCode(targetCurrency);
    setExchangeRate(rate);
    setFlag(flagEmoji);
  };

  // 3. Allow manual override (e.g., from Dropdown)
  const setCountryOverride = (code: string) => {
    // We assume we can look up the currency from the code
    updateContext(code); 
  };

  // 4. Performance Optimized Formatter
  const formatPrice = useCallback((amountInUSD: number) => {
    if (isNaN(amountInUSD)) return '';
    
    const convertedAmount = amountInUSD * exchangeRate;

    try {
      return new Intl.NumberFormat(countryCode === 'US' ? 'en-US' : countryCode, {
        style: 'currency',
        currency: currencyCode,
        maximumFractionDigits: convertedAmount > 1000 ? 0 : 2,
      }).format(convertedAmount);
    } catch (e) {
      // Fallback if Intl fails
      return `${currencyCode} ${convertedAmount.toFixed(2)}`;
    }
  }, [countryCode, currencyCode, exchangeRate]);

  return (
    <LocalizationContext.Provider 
      value={{ 
        countryCode, 
        currencyCode, 
        exchangeRate, 
        flag, 
        formatPrice,
        setCountryOverride 
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
}

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
