'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Github, Mail, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase'; // Ensure this exists from previous steps

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

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

    if (!error) {
      setIsSent(true);
    }
    setIsLoading(false);
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#020617] flex">
      
      {/* === LEFT: VISUAL SIDE (Hidden on mobile) === */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-16">
        {/* Background Visuals */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <div className="relative z-10 max-w-lg">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4" /> User Impact
           </div>
           <h1 className="text-5xl font-display font-bold text-white mb-6 leading-tight">
              "I funded a classroom in rural India from my couch."
           </h1>
           <p className="text-xl text-slate-300 mb-8">
              Join 12,000+ donors who are rewriting the rules of philanthropy. Transparent, direct, and fee-free.
           </p>
           
           <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                 {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i+20}`} className="w-12 h-12 rounded-full border-2 border-slate-900" />
                 ))}
              </div>
              <div className="text-white">
                 <p className="font-bold">Trusted Community</p>
                 <div className="flex items-center gap-1 text-xs text-slate-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" /> 100% Verified
                 </div>
              </div>
           </div>
        </div>
      </div>


      {/* === RIGHT: AUTH FORM === */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 lg:p-24 relative">
         <Link href="/" className="absolute top-8 right-8 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white">
            Back to Home
         </Link>

         <div className="max-w-md w-full mx-auto">
            <div className="mb-10">
               <div className="w-12 h-12 bg-gradient-to-tr from-teal-400 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg mb-6">
                  <Sparkles className="w-6 h-6 fill-white" />
               </div>
               <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Welcome back</h2>
               <p className="text-slate-500 dark:text-slate-400">Enter your details to access your secure account.</p>
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
                  <button 
                     onClick={() => handleSocialLogin('google')}
                     className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 font-bold text-slate-700 dark:text-white"
                  >
                     <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                     Continue with Google
                  </button>
                  <button 
                     onClick={() => handleSocialLogin('github')}
                     className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 font-bold text-slate-700 dark:text-white"
                  >
                     <Github className="w-5 h-5" />
                     Continue with GitHub
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
               By continuing, you agree to our <Link href="/terms" className="underline hover:text-slate-900 dark:hover:text-white">Terms</Link> and <Link href="/privacy" className="underline hover:text-slate-900 dark:hover:text-white">Privacy Policy</Link>.
            </p>
         </div>
      </div>
    </div>
  );
}
