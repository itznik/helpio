'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowRight, Sparkles, User, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: formData.name,
        }
      }
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Check your email to confirm your account!');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="p-8 md:p-12">
          
          <div className="text-center mb-10">
            <div className="w-12 h-12 bg-gradient-to-tr from-teal-400 to-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-6 rotate-3">
               <Sparkles className="w-6 h-6 fill-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Join Helpio</h1>
            <p className="text-slate-500">Start your journey of direct impact today.</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
               <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
               <div className="relative">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Jane Doe"
                   className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white font-medium"
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   required
                 />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Email</label>
               <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                 <input 
                   type="email" 
                   placeholder="jane@example.com"
                   className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white font-medium"
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   required
                 />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
               <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                 <input 
                   type="password" 
                   placeholder="••••••••"
                   className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white font-medium"
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                   required
                 />
               </div>
            </div>

            <button disabled={loading} className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 mt-4">
               {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight className="w-4 h-4" />
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
