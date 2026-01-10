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
  // Parallax speed for hero content
  const y = useTransform(scrollY, [0, 500], [0, 200]);
  // Fade out hero content faster
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <main className="min-h-screen relative flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0B1120] transition-colors duration-500">
      
      {/* =========================================
          STUNNING MATERIAL BACKGROUND GRAPHICS
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* 1. The ambient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-[#0B1120] dark:via-slate-900 dark:to-[#0B1120] opacity-80" />
        <div className="absolute inset-0 bg-grid opacity-[0.08] dark:opacity-[0.05]" />

        {/* 2. Large Material Gradient Blobs (Drifting) */}
        {/* Top Left - Teal/Blue */}
        <motion.div
           animate={{ 
             x: [0, 100, 0],
             y: [0, -50, 0],
             scale: [1, 1.1, 1] 
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
           className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-gradient-to-br from-teal-300/40 to-blue-500/40 dark:from-teal-600/20 dark:to-indigo-600/20 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-soft-light"
        />
        
        {/* Bottom Right - Indigo/Purple */}
        <motion.div
           animate={{ 
             x: [0, -100, 0],
             y: [0, 50, 0],
             scale: [1, 1.2, 1] 
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
           className="absolute -bottom-[30%] -right-[10%] w-[70vw] h-[70vw] bg-gradient-to-tl from-indigo-300/40 to-purple-500/40 dark:from-indigo-700/20 dark:to-purple-800/20 blur-[150px] rounded-full mix-blend-multiply dark:mix-blend-soft-light"
        />

        {/* 3. Organic SVG Structure (Rotating slowly) */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] opacity-30 dark:opacity-20"
        >
           <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
             <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" className="stop-teal-500 dark:stop-teal-400" stopOpacity="0.2"/>
                  <stop offset="100%" className="stop-indigo-500 dark:stop-indigo-400" stopOpacity="0.2"/>
                </linearGradient>
             </defs>
             <path d="M800,500 Q800,800 500,800 Q200,800 200,500 Q200,200 500,200 Q800,200 800,500 Z" fill="none" stroke="url(#grad1)" strokeWidth="2" />
             <path d="M900,500 Q900,900 500,900 Q100,900 100,500 Q100,100 500,100 Q900,100 900,500 Z" fill="none" stroke="url(#grad1)" strokeWidth="1" strokeDasharray="10 20" />
           </svg>
        </motion.div>

      </div>


      {/* =========================================
          HERO CONTENT (No Card Container)
      ========================================= */}
      <motion.section 
        style={{ y, opacity }}
        className="relative z-10 pt-40 pb-32 px-4 md:px-6 min-h-[95vh] flex flex-col items-center justify-center text-center"
      >
        <div className="max-w-5xl mx-auto w-full">
          
          {/* Badge */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-800/80 border-2 border-white dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 backdrop-blur-md text-xs font-bold text-slate-800 dark:text-slate-200 mb-10 tracking-wide uppercase"
          >
            <Sparkles className="w-4 h-4 text-teal-500" />
            <span>The Future of Philanthropy</span>
          </motion.div>

          {/* Headline - Enhanced shadows for readability without a box */}
          <motion.h1 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="text-5xl sm:text-6xl md:text-8xl lg:text-[9rem] font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-10 break-words drop-shadow-xl dark:drop-shadow-[0_5px_15px_rgba(255,255,255,0.1)]"
          >
            Turn wealth into <br />
            {/* Richer Gradient Text */}
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

          {/* Buttons - Bigger and bolder */}
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
            <button className="w-full sm:w-auto group px-12 py-6 rounded-full border-2 border-slate-900/10 dark:border-white/20 bg-white/70 dark:bg-slate-900/70 backdrop-blur-lg text-slate-900 dark:text-white font-bold text-xl hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              View Leaderboard <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Sections Layout - sliding over the fixed background */}
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
