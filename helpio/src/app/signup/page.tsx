'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, User, Mail, Lock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import LiveImpactVisualizer from '@/components/features/LiveImpactVisualizer';

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call our NEW Secure API
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setSuccess(true);
      toast.success('Account created! Check your email.');
      
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#020617] flex items-center justify-center p-4">
         <div className="text-center max-w-md animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
               <Mail className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Check your inbox</h2>
            <p className="text-slate-500 mb-8">
               We sent a secure verification link to <strong>{formData.email}</strong>. 
               Please click it to activate your account.
            </p>
            <Link href="/login" className="text-teal-600 font-bold hover:underline">
               Return to Login
            </Link>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex flex-col lg:flex-row">
      
      {/* LEFT: VISUALIZER (Hidden on mobile) */}
      <div className="hidden lg:block w-1/2 h-screen sticky top-0">
         <LiveImpactVisualizer />
      </div>

      {/* RIGHT: FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
        <div className="max-w-md w-full">
          
          <div className="mb-10">
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Create Account</h1>
            <p className="text-slate-500">Begin your journey of impact today.</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Full Name</label>
               <div className="relative group">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                 <input 
                   type="text" 
                   className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all font-medium"
                   placeholder="John Doe"
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   required
                 />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email</label>
               <div className="relative group">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                 <input 
                   type="email" 
                   className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all font-medium"
                   placeholder="name@example.com"
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   required
                 />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Password</label>
               <div className="relative group">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                 <input 
                   type="password" 
                   className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all font-medium"
                   placeholder="••••••••"
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                   required
                 />
               </div>
            </div>

            <button disabled={loading} className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed">
               {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
             Already have an account? <Link href="/login" className="font-bold text-teal-600 hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
