'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { ArrowRight, Mail, Lock, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import LiveImpactVisualizer from '@/components/features/LiveImpactVisualizer';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  // Create client-side supabase instance
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      toast.success('Welcome back!');
      
      // CRITICAL: Refresh router to sync server cookies before redirecting
      router.refresh(); 
      router.push('/dashboard');

    } catch (error: any) {
      toast.error(error.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error('Google login failed');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex">
      
      {/* LEFT: VISUALIZER (Hidden on mobile) */}
      <div className="hidden lg:block w-1/2 h-screen sticky top-0 border-r border-slate-800">
         <LiveImpactVisualizer />
      </div>

      {/* RIGHT: FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

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
            <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Access your impact dashboard.</p>
          </div>

          {/* Social Auth */}
          <button 
             onClick={handleGoogleLogin}
             className="w-full py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 font-bold text-slate-700 dark:text-white mb-6"
          >
             <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
             Continue with Google
          </button>

          <div className="relative mb-6">
             <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200 dark:border-slate-800"></div></div>
             <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-50 dark:bg-[#020617] px-2 text-slate-400 font-bold">Or with email</span></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
               <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Email</label>
               <div className="relative group">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                 <input 
                   type="email" 
                   className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-teal-500 dark:focus:border-teal-500 focus:ring-0 outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:font-medium"
                   placeholder="name@example.com"
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   required
                 />
               </div>
            </div>

            <div className="space-y-2">
               <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Password</label>
                  <Link href="/forgot-password" className="text-xs font-bold text-indigo-500 hover:underline">Forgot?</Link>
               </div>
               <div className="relative group">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                 <input 
                   type="password" 
                   className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 focus:border-teal-500 dark:focus:border-teal-500 focus:ring-0 outline-none transition-all font-bold text-slate-900 dark:text-white placeholder:font-medium"
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
               {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
             New here? <Link href="/signup" className="font-bold text-teal-600 hover:underline">Create an account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
