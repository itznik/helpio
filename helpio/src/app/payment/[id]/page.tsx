'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ArrowLeft, ShieldCheck, Heart, Info, Lock, Globe, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import CheckoutForm from '@/components/features/CheckoutForm'; // (From previous step)
import { COUNTRIES, calculateTax } from '@/lib/tax';
import { toast } from 'sonner';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SecureCheckoutPage({ params }: { params: { id: string } }) {
  // State
  const [donationAmount, setDonationAmount] = useState<string>('50');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [customTip, setCustomTip] = useState('');
  const [country, setCountry] = useState('US');
  const [clientSecret, setClientSecret] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serverBreakdown, setServerBreakdown] = useState<any>(null);

  // Client Calculations (For Instant Feedback)
  const donation = parseFloat(donationAmount) || 0;
  const tipAmount = customTip ? parseFloat(customTip) : (donation * tipPercentage) / 100;
  const estTax = calculateTax(donation + tipAmount, country);
  const estTotal = donation + tipAmount + estTax;

  // Secure Handshake with Server
  useEffect(() => {
    const initSecureTransaction = async () => {
      if (donation <= 0) return;
      setIsLoading(true);
      
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            amount: donation, 
            tipAmount: tipAmount,
            country: country,
            wishId: params.id,
            isAnonymous: false // Add toggle state if needed
          }),
        });

        if (!res.ok) {
           if (res.status === 429) toast.error("Too many attempts. Please wait.");
           throw new Error('Transaction failed initialization');
        }
        
        const data = await res.json();
        setClientSecret(data.clientSecret);
        setServerBreakdown(data.breakdown); // Use server data for final display to be 100% accurate
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce to prevent API spam
    const timeout = setTimeout(initSecureTransaction, 600);
    return () => clearTimeout(timeout);
  }, [donation, tipAmount, country, params.id]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-4 md:p-8">
      
      {/* Secure Context Header */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-indigo-500 to-teal-500 animate-gradient" />
      
      <Link href="/wishes" className="fixed top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-bold z-50">
        <ArrowLeft className="w-5 h-5" /> Cancel
      </Link>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-16 lg:mt-0">
        
        {/* LEFT: Configuration (Input) */}
        <div className="lg:col-span-7 space-y-6">
           
           {/* 1. Country & Tax Context */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-lg border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-indigo-500" /> Billing Region
                 </h3>
                 {country !== 'US' && (
                    <span className="text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg flex items-center gap-1">
                       <Info className="w-3 h-3" /> Tax Applicable
                    </span>
                 )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                 {COUNTRIES.map((c) => (
                    <button
                       key={c.code}
                       onClick={() => setCountry(c.code)}
                       className={`flex items-center gap-2 px-4 py-3 rounded-xl border font-bold text-sm transition-all ${
                          country === c.code 
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-600' 
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                       }`}
                    >
                       <span className="text-xl">{c.flag}</span> {c.code}
                    </button>
                 ))}
              </div>
           </div>

           {/* 2. Amount & Tipping */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] shadow-lg border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Contribution Details</h3>
              
              <div className="mb-8">
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Base Amount</label>
                 <div className="relative">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-2xl text-slate-300">$</span>
                    <input 
                       type="number" 
                       value={donationAmount} 
                       onChange={(e) => setDonationAmount(e.target.value)}
                       className="w-full pl-12 pr-6 py-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-black text-3xl focus:ring-2 focus:ring-teal-500 outline-none dark:text-white transition-all" 
                    />
                 </div>
              </div>

              {/* Tipping Grid */}
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-4">
                      <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> Platform Tip
                      </span>
                      <span className="text-xs font-bold text-slate-500">100% Optional</span>
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


        {/* RIGHT: Summary & Secure Payment (Output) */}
        <div className="lg:col-span-5 space-y-6">
           
           {/* Order Summary Card */}
           <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
             
             <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                   <span className="font-medium">Direct Grant</span>
                   <span className="font-bold text-slate-900 dark:text-white">${donation.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                   <span className="font-medium">Platform Tip</span>
                   <span className="font-bold text-slate-900 dark:text-white">${tipAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                   <span className="font-medium flex items-center gap-1">Tax ({country}) <Info className="w-3 h-3" /></span>
                   <span className="font-bold text-slate-900 dark:text-white">${estTax.toFixed(2)}</span>
                </div>
                
                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />
                
                <div className="flex justify-between items-end">
                   <span className="font-bold text-lg text-slate-900 dark:text-white">Total</span>
                   <span className="font-display font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600">
                      ${estTotal.toFixed(2)}
                   </span>
                </div>
             </div>

             {/* Secure Element Loading State */}
             <div className="relative min-h-[200px]">
                {!clientSecret || isLoading ? (
                   <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-xl z-10">
                      <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
                      <p className="text-xs font-bold text-slate-500 animate-pulse">Securing Connection...</p>
                   </div>
                ) : (
                   <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night', labels: 'floating' } }}>
                        <CheckoutForm amount={serverBreakdown?.total || estTotal} />
                      </Elements>
                   </div>
                )}
             </div>

             {/* Security Footer */}
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
