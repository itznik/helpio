'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

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
  
  // FIXED: Reduced parallax speed so text stays anchored comfortably
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  
  // FIXED: Removed the 'opacity' transform entirely so text doesn't vanish

  return (
    <main className="min-h-screen relative flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0B1120] transition-colors duration-500">
      
      {/* =========================================
          BACKGROUND LAYERS (Parallax Active)
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* 1. Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-[#0B1120] dark:via-slate-900 dark:to-[#0B1120] opacity-90" />
        <div className="absolute inset-0 bg-grid opacity-[0.08] dark:opacity-[0.05]" />

        {/* 2. Floating Orbs (They stay fixed but move slightly with animation) */}
        <motion.div
           animate={{ 
             x: [0, 50, 0],
             y: [0, -30, 0],
             scale: [1, 1.05, 1] 
           }}
           transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] bg-gradient-to-br from-teal-300/30 to-blue-500/30 dark:from-teal-600/10 dark:to-indigo-600/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-soft-light"
        />
        
        <motion.div
           animate={{ 
             x: [0, -50, 0],
             y: [0, 40, 0],
             scale: [1, 1.1, 1] 
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
           className="absolute -bottom-[10%] -right-[10%] w-[60vw] h-[60vw] bg-gradient-to-tl from-indigo-300/30 to-purple-500/30 dark:from-indigo-700/10 dark:to-purple-800/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-soft-light"
        />

        {/* 3. Wireframe Structure (Subtle Rotation) */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] opacity-20 dark:opacity-10"
        >
           <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
             <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className="stop-teal-500" stopOpacity="0.3"/>
                  <stop offset="100%" className="stop-purple-500" stopOpacity="0.3"/>
                </linearGradient>
             </defs>
             <circle cx="500" cy="500" r="400" fill="none" stroke="url(#grad1)" strokeWidth="1" strokeDasharray="20 20" />
             <path d="M500,100 L900,500 L500,900 L100,500 Z" fill="none" stroke="url(#grad1)" strokeWidth="1" />
           </svg>
        </motion.div>
      </div>


      {/* =========================================
          HERO CONTENT (Solid, No Fade Out)
      ========================================= */}
      <motion.section 
        style={{ y }} // Keeps the parallax move (vertical scroll) but NO opacity fade
        className="relative z-10 pt-40 pb-32 px-4 md:px-6 min-h-[90vh] flex flex-col items-center justify-center text-center"
      >
        <div className="max-w-5xl mx-auto w-full">
          
          {/* Badge */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 border border-white/50 dark:border-slate-700 shadow-md backdrop-blur-md text-xs font-bold text-slate-800 dark:text-slate-200 mb-10 uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4 text-teal-500" />
            <span>The Future of Philanthropy</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-10 break-words drop-shadow-xl"
          >
            Turn wealth into <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-600 dark:from-teal-400 dark:via-indigo-400 dark:to-purple-400 relative z-10 pb-2">
              tangible impact.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.6 }}
             className="text-xl md:text-3xl text-slate-700 dark:text-slate-300 max-w-4xl mx-auto mb-16 leading-relaxed font-medium px-4 drop-shadow-md"
          >
            Direct peer-to-peer giving. No middlemen, no mystery. 
            See exactly who you help and watch the world change.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full px-4"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-12 py-6 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-teal-50 text-white dark:text-slate-900 font-bold text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-teal-900/20 dark:shadow-white/10"
            >
              Make a Wish
            </button>
            <button className="w-full sm:w-auto group px-12 py-6 rounded-full border-2 border-slate-900/10 dark:border-white/20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg text-slate-900 dark:text-white font-bold text-xl hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              View Leaderboard <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Sections Layout */}
      <div className="relative z-10 w-full overflow-hidden bg-white dark:bg-slate-950 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)] dark:shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)] border-t border-slate-100/50 dark:border-slate-800/50 rounded-t-[3rem] mt-[-2rem]">
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
