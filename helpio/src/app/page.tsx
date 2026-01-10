'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Globe, ShieldCheck } from 'lucide-react';

// Import Sections
import WishFeed from '@/components/sections/WishFeed';
import Leaderboard from '@/components/sections/Leaderboard';
import HowItWorks from '@/components/sections/HowItWorks';
import AboutUs from '@/components/sections/AboutUs';
import OurImpact from '@/components/sections/OurImpact';
import CreateWishModal from '@/components/features/CreateWishModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <main className="min-h-screen relative flex flex-col overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      
      {/* =========================================
          BACKGROUND: "THE RIPPLE NETWORK"
          Concept: Precision, Connectivity, Impact
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* 1. Base Gradient (Subtle Vignette) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-slate-50 to-slate-100 dark:from-[#0f172a] dark:via-[#020617] dark:to-[#000000] opacity-90" />
        
        {/* 2. Technical Grid (The Foundation) */}
        <div className="absolute inset-0 bg-grid opacity-[0.05] dark:opacity-[0.1]" />

        {/* 3. THE ARCHITECTURE: Concentric Impact Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vw] max-w-[1200px] max-h-[1200px]">
           <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
             
             {/* Center Glow */}
             <defs>
               <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                 <stop offset="0%" stopColor="#0d9488" stopOpacity="0.15" />
                 <stop offset="100%" stopColor="#0d9488" stopOpacity="0" />
               </radialGradient>
             </defs>
             <circle cx="500" cy="500" r="300" fill="url(#centerGlow)" />

             {/* Ring 1: The Core (Static) */}
             <circle cx="500" cy="500" r="150" fill="none" stroke="currentColor" strokeWidth="1" className="text-slate-300 dark:text-slate-700" opacity="0.5" />
             
             {/* Ring 2: The Network (Rotating Clockwise) */}
             <g className="origin-center animate-[spin_60s_linear_infinite]">
               <circle cx="500" cy="500" r="250" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" className="text-slate-400 dark:text-slate-600" opacity="0.4" />
               {/* Orbital Node */}
               <circle cx="750" cy="500" r="4" className="fill-teal-500" />
             </g>

             {/* Ring 3: The Reach (Rotating Counter-Clockwise) */}
             <g className="origin-center animate-[spin_80s_linear_infinite_reverse]">
               <circle cx="500" cy="500" r="380" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="20 20" className="text-slate-300 dark:text-slate-700" opacity="0.3" />
               {/* Orbital Node */}
               <circle cx="500" cy="120" r="6" className="fill-indigo-500" />
             </g>

             {/* Ring 4: The Outer Bounds (Pulse) */}
             <circle cx="500" cy="500" r="480" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800" opacity="0.5">
                <animate attributeName="r" values="480;490;480" dur="4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0.2;0.5" dur="4s" repeatCount="indefinite" />
             </circle>

             {/* Connection Lines (Geometric precision) */}
             <line x1="500" y1="150" x2="500" y2="850" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800" opacity="0.2" />
             <line x1="150" y1="500" x2="850" y2="500" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800" opacity="0.2" />
           </svg>
        </div>
      </div>


      {/* =========================================
          HERO CONTENT
      ========================================= */}
      <motion.section 
        style={{ y }} 
        className="relative z-10 pt-40 pb-32 px-4 md:px-6 min-h-[90vh] flex flex-col items-center justify-center text-center"
      >
        <div className="max-w-5xl mx-auto w-full">
          
          {/* Trust Badge */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 backdrop-blur-sm text-xs font-bold text-slate-600 dark:text-slate-400 mb-8 uppercase tracking-widest shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-500" />
            <span>Secure • Transparent • Direct</span>
          </motion.div>

          {/* Headline - Clean & Modern */}
          <motion.h1 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-8 break-words"
          >
            Turn wealth into <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-800 dark:from-teal-400 dark:via-emerald-400 dark:to-teal-200 relative z-10 pb-2">
              tangible impact.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.6 }}
             className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium px-4"
          >
            A verified network connecting resources directly to needs.
            <br className="hidden md:block" /> No middlemen. Complete transparency. 100% Impact.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full px-4"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-slate-900/10 dark:shadow-white/10"
            >
              Start Granting
            </button>
            <button className="w-full sm:w-auto group px-10 py-5 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-white font-bold text-lg hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
            >
              See Global Impact <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Sections Layout */}
      <div className="relative z-10 w-full overflow-hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900 shadow-[0_-20px_40px_-15px_rgba(0,0,0,0.05)]">
        <HowItWorks />
        <WishFeed />
        <AboutUs />
        <Leaderboard />
        <OurImpact />
      </div>

      <CreateWishModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}

