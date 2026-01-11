'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { countries } from 'country-list-json';
import { COUNTRY_TO_CURRENCY } from '@/lib/currencyMap';

// Exchange rates (In production, fetch this from an API like open.er-api.com)
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
  SGD: 1.34,
  // If a currency isn't here, we default to 1 (USD parity)
};

interface LocalizationState {
  countryCode: string;
  currencyCode: string;
  exchangeRate: number;
  flag: string;
  currencySymbol: string; // Added this for explicit symbol access
  formatPrice: (amountInUSD: number) => string;
  setCountryOverride: (code: string) => void;
}

const LocalizationContext = createContext<LocalizationState | undefined>(undefined);

export function LocalizationProvider({ children }: { children: React.ReactNode }) {
  const [countryCode, setCountryCode] = useState('US');
  const [currencyCode, setCurrencyCode] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [flag, setFlag] = useState('🇺🇸');

  // 1. Initial Detection
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        if (data.country_code) {
          updateContext(data.country_code);
        }
      } catch (error) {
        console.warn('Auto-detection failed, defaulting to US.');
      }
    };
    detectLocation();
  }, []);

  // 2. Logic to Update State
  const updateContext = (cCode: string) => {
    // A. Determine Currency (Use our map, fallback to USD)
    const targetCurrency = COUNTRY_TO_CURRENCY[cCode] || 'USD';
    
    // B. Determine Rate
    const rate = ESTIMATED_RATES[targetCurrency] || 1; 

    // C. Determine Flag
    const flagEmoji = cCode.toUpperCase().replace(/./g, char => 
      String.fromCodePoint(char.charCodeAt(0) + 127397)
    );

    setCountryCode(cCode);
    setCurrencyCode(targetCurrency);
    setExchangeRate(rate);
    setFlag(flagEmoji);
  };

  const setCountryOverride = (code: string) => {
    updateContext(code); 
  };

  // 3. Robust Formatter
  const formatPrice = useCallback((amountInUSD: number) => {
    if (isNaN(amountInUSD)) return '';
    
    const convertedAmount = amountInUSD * exchangeRate;

    try {
      // This uses the browser's native formatter to get symbols like ₹, $, € correctly
      return new Intl.NumberFormat(countryCode === 'US' ? 'en-US' : 'en-IN', { // 'en-IN' ensures ₹ shows nicely
        style: 'currency',
        currency: currencyCode,
        maximumFractionDigits: convertedAmount > 1000 ? 0 : 2,
      }).format(convertedAmount);
    } catch (e) {
      return `${currencyCode} ${convertedAmount.toFixed(2)}`;
    }
  }, [countryCode, currencyCode, exchangeRate]);

  // 4. Get just the symbol (e.g., "$")
  const getSymbol = () => {
    try {
       return (0).toLocaleString('en-US', { style: 'currency', currency: currencyCode }).replace(/\d/g, '').trim().replace('.', '');
    } catch {
       return '$';
    }
  };

  return (
    <LocalizationContext.Provider 
      value={{ 
        countryCode, 
        currencyCode, 
        exchangeRate, 
        flag, 
        currencySymbol: getSymbol(),
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
  if (!context) throw new Error('useLocalization error');
  return context;
};
