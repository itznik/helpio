'use client';

import { useState, useEffect, useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ArrowLeft, ShieldCheck, Heart, Info, Lock, Globe, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useLocalization } from '@/context/LocalizationContext';
import CheckoutForm from '@/components/features/CheckoutForm';
import { toast } from 'sonner';
import { countries } from 'country-list-json'; 

// Load Stripe outside component render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SecureCheckoutPage({ params }: { params: { id: string } }) {
  // 1. Get Global Context
  const { countryCode, currencyCode, exchangeRate, formatPrice, setCountryOverride } = useLocalization();

  // 2. Local State
  const [donationInput, setDonationInput] = useState<string>('50'); 
  const [tipPercentage, setTipPercentage] = useState(15);
  const [customTip, setCustomTip] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverBreakdown, setServerBreakdown] = useState<any>(null);

  // 3. Calculations
  const donationBase = parseFloat(donationInput) || 0;
  const tipAmount = customTip ? parseFloat(customTip) : (donationBase * tipPercentage) / 100;
  
  // Tax Logic: Simplified 5% check for non-US
  const estTax = countryCode !== 'US' ? (donationBase + tipAmount) * 0.05 : 0; 
  const totalUSD = donationBase + tipAmount + estTax;

  // 4. Secure Handshake (Debounced to reduce API Spam)
  useEffect(() => {
    const initSecureTransaction = async () => {
      if (donationBase <= 0) return;
      setIsLoading(true);
      
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            amount: donationBase, 
            tipAmount: tipAmount,
            country: countryCode,
            wishId: params.id,
            isAnonymous: false 
          }),
        });

        if (!res.ok) {
           if (res.status === 429) toast.error("Too many attempts. Please wait.");
           throw new Error('Transaction failed initialization');
        }
        
        const data = await res.json();
        setClientSecret(data.clientSecret);
        setServerBreakdown(data.breakdown);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Wait 600ms after user stops typing
    const timeout = setTimeout(initSecureTransaction, 600);
    return () => clearTimeout(timeout);
  }, [donationBase, tipAmount, countryCode, params.id]); // Dependencies for re-fetch

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-4 md:p-8">
      
      {/* Visual Header */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-teal-500 animate-gradient" />
      
      <Link href="/wishes" className="fixed top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-bold z-50">
        <ArrowLeft className="w-5 h-5" /> Cancel
      </Link>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-16 lg:mt-0">
        
        {/* LEFT COLUMN: Inputs */}
        <div className="lg:col-span-7 space-y-6">
           
           {/* Country Selector (Full List) */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-lg border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-indigo-500" /> Billing Region
                 </h3>
                 {countryCode !== 'US' && (
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg flex items-center gap-1">
                       <Info className="w-3 h-3" /> Intl. Rates Apply
                    </span>
                 )}
              </div>
              
              <select 
                value={countryCode}
                onChange={(e) => setCountryOverride(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                 {(countries as any[]).map((c: any) => (
                    <option key={c.code} value={c.code}>
                       {c.name}
                    </option>
                 ))}
              </select>
           </div>

           {/* Amount Input */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-lg border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Contribution (USD)</h3>
              
              <div className="mb-4">
                 <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-2xl text-slate-300">$</span>
                    <input 
                       type="number" 
                       value={donationInput} 
                       onChange={(e) => setDonationInput(e.target.value)}
                       className="w-full pl-12 pr-6 py-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-black text-3xl focus:ring-2 focus:ring-teal-500 outline-none dark:text-white transition-all" 
                    />
                 </div>
                 <p className="mt-2 text-right text-sm font-bold text-indigo-600 dark:text-indigo-400">
                    ≈ {formatPrice(parseFloat(donationInput))}
                 </p>
              </div>

              {/* Tipping */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Platform Tip
                      </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                      {[10, 15, 20].map((pct) => (
                          <button
                              key={pct}
                              onClick={() => { setTipPercentage(pct); setCustomTip(''); }}
                              className={`py-2 rounded-lg text-sm font-bold transition-all ${
                                  !customTip && tipPercentage === pct 
                                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' 
                                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'
                              }`}
                          >
                              {pct}%
                          </button>
                      ))}
                      <input 
                         type="number" 
                         placeholder="Custom"
                         value={customTip}
                         onChange={(e) => { setCustomTip(e.target.value); setTipPercentage(0); }}
                         className="px-2 rounded-lg text-sm font-bold text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                  </div>
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: Summary & Stripe */}
        <div className="lg:col-span-5 space-y-6">
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
             
             <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                   <span className="font-medium">Direct Grant</span>
                   <span className="font-bold text-slate-900 dark:text-white">{formatPrice(donationBase)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                   <span className="font-medium">Platform Tip</span>
                   <span className="font-bold text-slate-900 dark:text-white">{formatPrice(tipAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                   <span className="font-medium flex items-center gap-1">Est. Tax ({countryCode})</span>
                   <span className="font-bold text-slate-900 dark:text-white">{formatPrice(estTax)}</span>
                </div>
                
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                
                <div className="flex justify-between items-end">
                   <span className="font-bold text-lg text-slate-900 dark:text-white">Total</span>
                   <span className="font-display font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">
                      {formatPrice(totalUSD)}
                   </span>
                </div>
             </div>

             {/* Stripe Element Container */}
             <div className="relative min-h-[200px]">
                {!clientSecret || isLoading ? (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl z-10">
                      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
                      <p className="text-xs font-bold text-slate-500 animate-pulse">Securing Connection...</p>
                   </div>
                ) : (
                   <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', labels: 'floating' } }}>
                        <CheckoutForm amount={serverBreakdown?.total || totalUSD} />
                      </Elements>
                   </div>
                )}
             </div>

             <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Encrypted</div>
                <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> PCI Compliant</div>
             </div>
           </div>
        </div>

      </div>
    </main>
  );
}
