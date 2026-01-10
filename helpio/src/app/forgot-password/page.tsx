'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/dashboard/settings`,
    });

    if (error) toast.error(error.message);
    else toast.success('Password reset link sent to your email!');
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-4">
       <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200 dark:border-slate-800 shadow-xl">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white mb-8">
             <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
          
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Reset Password</h1>
          <p className="text-slate-500 mb-8">Enter your email and we'll send you a magic link to get back in.</p>
          
          <form onSubmit={handleReset} className="space-y-4">
             <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                 <input 
                   type="email" 
                   placeholder="name@example.com"
                   className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white font-medium"
                   onChange={(e) => setEmail(e.target.value)}
                   required
                 />
             </div>
             <button disabled={loading} className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold hover:bg-teal-700 transition-colors">
                {loading ? 'Sending...' : 'Send Reset Link'}
             </button>
          </form>
       </div>
    </div>
  );
}
