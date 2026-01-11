'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ArrowLeft, ShieldCheck, Heart, Info, Lock, Globe } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLocalization } from '@/context/LocalizationContext';
import CheckoutForm from '@/components/features/CheckoutForm';
import { toast } from 'sonner';
import { countries } from 'country-list-json'; 

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SecureCheckoutPage() {
  const params = useParams();
  const wishId = params?.id as string;
  const { countryCode, currencyCode, formatPrice, setCountryOverride, currencySymbol } = useLocalization();

  const [donationInput, setDonationInput] = useState<string>('50'); 
  const [tipPercentage, setTipPercentage] = useState(15);
  const [customTip, setCustomTip] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverBreakdown, setServerBreakdown] = useState<any>(null);

  const donationBase = parseFloat(donationInput) || 0;
  const tipAmount = customTip ? parseFloat(customTip) : (donationBase * tipPercentage) / 100;
  const estTax = countryCode !== 'US' ? (donationBase + tipAmount) * 0.05 : 0; 
  const totalUSD = donationBase + tipAmount + estTax;

  useEffect(() => {
    if (donationBase <= 0 || !wishId) return;
    
    setIsLoading(true);
    const initSecureTransaction = async () => {
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            amount: donationBase, 
            tipAmount, country: countryCode, wishId, isAnonymous: false 
          }),
        });

        if (!res.ok) throw new Error('Init failed');
        
        const data = await res.json();
        setClientSecret(data.clientSecret);
        setServerBreakdown(data.breakdown);
      } catch (error) {
        // Silent catch to prevent toast spam while typing
      } finally {
        setIsLoading(false);
      }
    };

    const timeout = setTimeout(initSecureTransaction, 600);
    return () => clearTimeout(timeout);
  }, [donationBase, tipAmount, countryCode, wishId]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-4 md:p-8">
      <Link href="/wishes" className="fixed top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold z-50">
        <ArrowLeft className="w-5 h-5" /> Cancel
      </Link>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-16 lg:mt-0">
        
        {/* LEFT COLUMN: Inputs */}
        <div className="lg:col-span-7 space-y-6">
           {/* Country Selector */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-lg border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-indigo-500" /> Billing Region
                 </h3>
              </div>
              <select 
                value={countryCode}
                onChange={(e) => setCountryOverride(e.target.value)}
                className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-lg outline-none"
              >
                 {(countries as any[]).map((c: any) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                 ))}
              </select>
           </div>

           {/* Amount Input */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-lg border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Contribution (USD Base)</h3>
              <div className="mb-4 relative">
                 <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-2xl text-slate-300">$</span>
                 <input 
                    type="number" 
                    value={donationInput} 
                    onChange={(e) => setDonationInput(e.target.value)}
                    className="w-full pl-12 pr-6 py-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-black text-3xl focus:ring-2 focus:ring-teal-500 outline-none dark:text-white transition-all" 
                 />
              </div>
              {/* LOCAL CONVERSION DISPLAY */}
              <p className="text-right font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-end gap-2">
                 You pay approx: <span className="text-xl bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-lg border border-indigo-100 dark:border-indigo-800">{formatPrice(parseFloat(donationInput))}</span>
              </p>
           </div>

           {/* Tipping */}
           <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Platform Tip
                  </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                  {[10, 15, 20].map((pct) => (
                      <button key={pct} onClick={() => { setTipPercentage(pct); setCustomTip(''); }}
                          className={`py-2 rounded-lg text-sm font-bold transition-all ${!customTip && tipPercentage === pct ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800'}`}>
                          {pct}%
                      </button>
                  ))}
                  <input type="number" placeholder="Custom" value={customTip} onChange={(e) => { setCustomTip(e.target.value); setTipPercentage(0); }}
                     className="px-2 rounded-lg text-sm font-bold text-center bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none" />
              </div>
           </div>
        </div>

        {/* RIGHT COLUMN: Summary */}
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
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                <div className="flex justify-between items-end">
                   <span className="font-bold text-lg text-slate-900 dark:text-white">Total</span>
                   <span className="font-display font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">
                      {formatPrice(totalUSD)}
                   </span>
                </div>
             </div>

             <div className="relative min-h-[200px]">
                {!clientSecret || isLoading ? (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl z-10">
                      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
                      <p className="text-xs font-bold text-slate-500 animate-pulse">Securing...</p>
                   </div>
                ) : (
                   <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', labels: 'floating' } }}>
                     <CheckoutForm amount={serverBreakdown?.total || totalUSD} />
                   </Elements>
                )}
             </div>
             <div className="mt-6 flex items-center justify-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL Encrypted</div>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
