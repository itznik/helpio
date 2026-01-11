'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ArrowLeft, ShieldCheck, Heart, Info, Lock } from 'lucide-react';
import Link from 'next/link';
import CheckoutForm from '@/components/features/CheckoutForm';

// Initialize Stripe outside component to avoid recreation
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaymentPage({ params }: { params: { id: string } }) {
  const [donationAmount, setDonationAmount] = useState('50');
  const [tipPercentage, setTipPercentage] = useState(15);
  const [customTip, setCustomTip] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  // Calculations
  const donation = parseFloat(donationAmount) || 0;
  const tipAmount = customTip ? parseFloat(customTip) : (donation * tipPercentage) / 100;
  const total = donation + tipAmount;

  // Fetch PaymentIntent when total changes (Debounced in real app, simplified here)
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (total <= 0) return;
      
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: donation, 
          tipAmount: tipAmount,
          wishId: params.id,
          type: 'DONATION'
        }),
      });
      
      const data = await res.json();
      setClientSecret(data.clientSecret);
    };

    // Debounce to prevent API spam while typing
    const timeout = setTimeout(fetchPaymentIntent, 500);
    return () => clearTimeout(timeout);
  }, [donation, tipAmount, params.id]);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-4 md:p-8">
      
      <Link href="/wishes" className="fixed top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-bold z-50">
        <ArrowLeft className="w-5 h-5" /> Back
      </Link>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mt-16 lg:mt-0">
        
        {/* LEFT: Trust Summary (Hybrid Model Visuals) */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Payment Breakdown</h3>
             
             <div className="space-y-4">
                {/* Donation Part */}
                <div className="flex justify-between items-center p-4 bg-teal-50 dark:bg-teal-900/20 rounded-2xl border border-teal-100 dark:border-teal-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-teal-600">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">Direct to Recipient</p>
                            <p className="text-xs text-slate-500">Zero platform fees taken</p>
                        </div>
                    </div>
                    <span className="font-bold text-xl text-teal-600 dark:text-teal-400">${donation}</span>
                </div>

                {/* Tip Part */}
                <div className="flex justify-between items-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-indigo-600">
                            <Heart className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 dark:text-white">Helpio Support Tip</p>
                            <p className="text-xs text-slate-500">Optional contribution</p>
                        </div>
                    </div>
                    <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">${tipAmount.toFixed(2)}</span>
                </div>
             </div>

             <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-end">
                <span className="text-slate-500 font-medium">Total Charge</span>
                <span className="text-4xl font-display font-black text-slate-900 dark:text-white">${total.toFixed(2)}</span>
             </div>
          </div>
          
          {/* Security Badge */}
          <div className="flex items-center gap-3 justify-center text-sm text-slate-400">
            <Lock className="w-4 h-4" />
            <span>256-bit SSL Encrypted Connection</span>
          </div>
        </div>


        {/* RIGHT: Payment Actions */}
        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
           
           {/* 1. Amount Selectors */}
           <div className="space-y-8 mb-8">
              <div>
                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Donation Amount</label>
                 <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input 
                       type="number" 
                       value={donationAmount} 
                       onChange={(e) => setDonationAmount(e.target.value)}
                       className="w-full pl-8 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold text-lg focus:ring-2 focus:ring-teal-500 outline-none dark:text-white transition-all" 
                    />
                 </div>
              </div>

              {/* Tipping UI */}
              <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-start mb-4">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                          Add a tip for Helpio? 
                          <div className="group relative">
                              <Info className="w-4 h-4 text-slate-400 cursor-help" />
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                  We charge 0% fees. This tip covers our server costs.
                              </div>
                          </div>
                      </label>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                      {[10, 15, 20].map((pct) => (
                          <button
                              key={pct}
                              onClick={() => { setTipPercentage(pct); setCustomTip(''); }}
                              className={`py-2 rounded-lg text-sm font-bold transition-all ${
                                  !customTip && tipPercentage === pct 
                                  ? 'bg-indigo-600 text-white shadow-md' 
                                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                              }`}
                          >
                              {pct}%
                          </button>
                      ))}
                      <button
                          onClick={() => { setTipPercentage(0); setCustomTip('0'); }}
                          className={`py-2 rounded-lg text-sm font-bold transition-all ${
                              customTip || tipPercentage === 0
                              ? 'bg-white dark:bg-slate-900 border-2 border-indigo-600 text-indigo-600' 
                              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                      >
                          Other
                      </button>
                  </div>
              </div>
           </div>

           {/* 2. Stripe Elements (Loads only when clientSecret is ready) */}
           {clientSecret && (
             <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}>
               <CheckoutForm amount={total} />
             </Elements>
           )}

           {!clientSecret && (
             <div className="h-40 flex items-center justify-center text-slate-400 text-sm animate-pulse">
               Preparing secure connection...
             </div>
           )}

        </div>

      </div>
    </main>
  );
}
