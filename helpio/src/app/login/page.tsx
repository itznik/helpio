'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 1. SECURE PASSWORD LOGIN
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast.error(error.message);
      setIsLoading(false);
    } else {
      toast.success('Welcome back!');
      // 2. REFRESH ROUTER & REDIRECT
      router.refresh();
      router.push('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Failed to initiate Google login');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex">
      
      {/* LEFT: VISUAL SIDE */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <div className="relative z-10 max-w-lg">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4" /> Secure Access
           </div>
           <h1 className="text-5xl font-display font-bold text-white mb-6 leading-tight">
              Welcome back to the future of giving.
           </h1>
           <p className="text-slate-400 text-lg">
              Manage your impact, track donations, and connect with the community.
           </p>
        </div>
      </div>

      {/* RIGHT: AUTH FORM */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-24 relative">
         <Link href="/" className="absolute top-8 right-8 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white">
            Back to Home
         </Link>

         <div className="max-w-md w-full mx-auto">
            <div className="mb-10">
               <div className="w-12 h-12 bg-gradient-to-tr from-teal-400 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg mb-6">
                  <Sparkles className="w-6 h-6 fill-white" />
               </div>
               <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Sign In</h2>
               <p className="text-slate-500 dark:text-slate-400">Enter your credentials to access your account.</p>
            </div>

            <div className="space-y-6">
               {/* GOOGLE BUTTON */}
               <button 
                  onClick={handleGoogleLogin}
                  className="w-full py-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 font-bold text-slate-700 dark:text-white relative group overflow-hidden"
               >
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 relative z-10" alt="Google" />
                  <span className="relative z-10">Sign in with Google</span>
               </button>

               <div className="relative">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-[#020617] px-2 text-slate-400 font-bold">Or with email</span></div>
               </div>

               <form onSubmit={handleLogin} className="space-y-4">
                  {/* Email Input */}
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                     <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                           type="email" 
                           placeholder="name@example.com"
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                           className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium dark:text-white transition-all"
                           required
                        />
                     </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-2">
                     <div className="flex justify-between items-center ml-1">
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                        <Link href="/forgot-password" className="text-xs font-bold text-teal-600 hover:underline">
                           Forgot password?
                        </Link>
                     </div>
                     <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input 
                           type={showPassword ? "text" : "password"}
                           placeholder="••••••••"
                           value={formData.password}
                           onChange={(e) => setFormData({...formData, password: e.target.value})}
                           className="w-full pl-12 pr-12 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium dark:text-white transition-all"
                           required
                        />
                        <button 
                           type="button"
                           onClick={() => setShowPassword(!showPassword)}
                           className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        >
                           {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                     </div>
                  </div>

                  <button 
                     disabled={isLoading}
                     className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                  >
                     {isLoading ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
                  </button>
               </form>
            </div>
            
            <p className="text-center text-xs text-slate-400 mt-8">
               No account? <Link href="/signup" className="underline hover:text-slate-900 dark:hover:text-white font-bold">Create one</Link>.
            </p>
         </div>
      </div>
    </div>
  );
}
