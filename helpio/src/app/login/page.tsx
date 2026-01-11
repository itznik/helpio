'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Mail, ShieldCheck, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Supabase Magic Link Login
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      setIsSent(true);
      toast.success('Check your email for the magic link!');
    }
    setIsLoading(false);
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
               <p className="text-slate-500 dark:text-slate-400">Access your dashboard securely.</p>
            </div>

            {isSent ? (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 p-6 rounded-2xl text-center"
               >
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
                     <Mail className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">Check your inbox</h3>
                  <p className="text-sm text-slate-500 mb-4">We sent a magic link to <span className="font-bold">{email}</span></p>
                  <button onClick={() => setIsSent(false)} className="text-xs font-bold text-emerald-600 hover:underline">Try different email</button>
               </motion.div>
            ) : (
               <div className="space-y-6">
                  {/* GOOGLE BUTTON */}
                  <button 
                     onClick={handleGoogleLogin}
                     className="w-full py-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 font-bold text-slate-700 dark:text-white relative group overflow-hidden"
                  >
                     <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5 relative z-10" alt="Google" />
                     <span className="relative z-10">Continue with Google</span>
                  </button>

                  <div className="relative">
                     <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
                     <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-[#020617] px-2 text-slate-400 font-bold">Or continue with email</span></div>
                  </div>

                  <form onSubmit={handleLogin} className="space-y-4">
                     <div>
                        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1 mb-1 block">Email Address</label>
                        <input 
                           type="email" 
                           placeholder="name@example.com"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="w-full px-5 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium dark:text-white"
                           required
                        />
                     </div>
                     <button 
                        disabled={isLoading}
                        className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                     >
                        {isLoading ? 'Sending Link...' : 'Sign In with Email'} <ArrowRight className="w-4 h-4" />
                     </button>
                  </form>
               </div>
            )}
            
            <p className="text-center text-xs text-slate-400 mt-8">
               No account? <Link href="/signup" className="underline hover:text-slate-900 dark:hover:text-white font-bold">Create one</Link>.
            </p>
         </div>
      </div>
    </div>
  );
}
