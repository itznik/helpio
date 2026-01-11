'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, User, Mail, Lock, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import LiveImpactVisualizer from '@/components/features/LiveImpactVisualizer';
import { motion } from 'framer-motion';

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use our Secure API
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setSuccess(true);
      toast.success('Secure link dispatched!');
      
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
         <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-md w-full bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-2xl"
         >
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 animate-pulse">
               <Mail className="w-10 h-10 text-emerald-400" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-4">Check your inbox</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
               We sent a secure magic link to <br/><span className="text-white font-bold">{formData.email}</span>. 
               Click it to activate your account instantly.
            </p>
            <div className="flex flex-col gap-3">
               <button onClick={() => window.open('https://gmail.com', '_blank')} className="w-full py-3 rounded-xl bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors">
                  Open Email App
               </button>
               <Link href="/login" className="text-teal-400 font-bold hover:text-teal-300 text-sm">
                  Return to Login
               </Link>
            </div>
         </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex">
      
      {/* LEFT: VISUALIZER (Takes 50% width on Desktop) */}
      <div className="hidden lg:block w-1/2 h-screen sticky top-0 border-r border-slate-800">
         <LiveImpactVisualizer />
      </div>

      {/* RIGHT: FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 relative overflow-hidden">
        {/* Subtle Background Elements for Form Side */}
        <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[420px] w-full relative z-10"
        >
          
          <div className="mb-10">
            <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
               <div className="w-8 h-8 bg-gradient-to-tr from-teal-400 to-indigo-500 rounded-lg flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                  <Sparkles className="w-4 h-4 fill-white" />
               </div>
               <span className="font-bold text-lg text-slate-900 dark:text-white">helpio.</span>
            </Link>
            <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Create Account</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Start your journey of direct impact.</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Full Name</label>
               <div className="relative group">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                 <input 
                   type="text" 
                   className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-0 outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:font-medium"
                   placeholder="John Doe"
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   required
                 />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Email Address</label>
               <div className="relative group">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                 <input 
                   type="email" 
                   className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-0 outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:font-medium"
                   placeholder="name@example.com"
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   required
                 />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Password</label>
               <div className="relative group">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                 <input 
                   type="password" 
                   className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-0 outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:font-medium"
                   placeholder="••••••••"
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                   required
                 />
               </div>
            </div>

            <button 
              disabled={loading} 
              className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
               {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
             Already have an account? <Link href="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline">Log in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
