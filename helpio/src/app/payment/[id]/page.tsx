'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Lock, ShieldCheck, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentPage({ params }: { params: { id: string } }) {
  const [amount, setAmount] = useState('50');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-slate-100 dark:border-slate-800"
        >
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Thank you!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Your donation of ${amount} has been securely processed. You just changed a life.
          </p>
          <Link href="/wishes">
            <button className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold">
              Return to Catalogue
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-4 md:p-8">
      
      {/* Back Button */}
      <Link href="/wishes" className="fixed top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-bold z-50">
        <ArrowLeft className="w-5 h-5" /> Back
      </Link>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start mt-16 lg:mt-0">
        
        {/* LEFT: Wish Summary */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl">
             <div className="flex items-center gap-4 mb-6">
                <img src="https://i.pravatar.cc/150?u=12" className="w-16 h-16 rounded-full border-4 border-slate-50 dark:border-slate-800" />
                <div>
                   <h3 className="text-xl font-bold text-slate-900 dark:text-white">Laptop for Coding</h3>
                   <p className="text-slate-500">Requested by Aarav P.</p>
                </div>
             </div>
             <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                "I have been learning Python on my phone for 6 months. I need a laptop to compile code efficiently and land a job."
             </p>
             <div className="flex items-center gap-2 text-sm font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/20 p-3 rounded-xl w-fit">
                <ShieldCheck className="w-4 h-4" /> 100% Verified Request
             </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
             <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2">Zero Fee Promise</h4>
                <p className="opacity-80 text-sm">Helpio charges 0% platform fees. We ask for an optional tip to keep the lights on.</p>
             </div>
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 blur-[60px] opacity-50" />
          </div>
        </div>


        {/* RIGHT: Payment Form */}
        <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
           
           {/* Header */}
           <div className="mb-8">
              <h1 className="text-3xl font-display font-black text-slate-900 dark:text-white mb-2">Secure Donation</h1>
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                 <Lock className="w-3 h-3" /> Encrypted via Stripe (256-bit SSL)
              </div>
           </div>

           <form onSubmit={handlePayment} className="space-y-6">
              
              {/* Amount Selector */}
              <div>
                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Select Amount</label>
                 <div className="grid grid-cols-3 gap-3">
                    {['25', '50', '100'].map((val) => (
                       <button 
                         type="button"
                         key={val}
                         onClick={() => setAmount(val)}
                         className={`py-3 rounded-xl font-bold border transition-all ${
                            amount === val 
                            ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-lg' 
                            : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-900'
                         }`}
                       >
                          ${val}
                       </button>
                    ))}
                 </div>
                 <div className="mt-3 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input 
                       type="number" 
                       value={amount} 
                       onChange={(e) => setAmount(e.target.value)}
                       className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-bold focus:ring-2 focus:ring-teal-500 outline-none dark:text-white" 
                    />
                 </div>
              </div>

              {/* Card Details (Mockup) */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                 <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Card Details</label>
                 <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                       type="text" 
                       placeholder="0000 0000 0000 0000" 
                       className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white placeholder:text-slate-400"
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <input 
                       type="text" 
                       placeholder="MM/YY" 
                       className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                    />
                    <input 
                       type="text" 
                       placeholder="CVC" 
                       className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
                    />
                 </div>
              </div>

              <button 
                disabled={isProcessing}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-bold text-lg hover:shadow-xl hover:scale-[1.01] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                 {isProcessing ? 'Processing...' : `Donate $${amount}`}
              </button>

           </form>
        </div>

      </div>
    </main>
  );
}
