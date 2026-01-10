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
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <main className="min-h-screen relative flex flex-col overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      
      {/* =========================================
          STUNNING SVG BACKGROUND (No Blobs)
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        
        {/* 1. Subtle Base Grid */}
        <div className="absolute inset-0 bg-grid opacity-[0.15] dark:opacity-[0.1]" />

        {/* 2. Primary Network Structure (Slow Rotate) */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] max-w-[1200px] max-h-[1200px] opacity-60 dark:opacity-40"
        >
           <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
             <g fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-300 dark:text-slate-700">
               <circle cx="400" cy="400" r="150" opacity="0.2" />
               <circle cx="400" cy="400" r="300" opacity="0.1" />
               <path d="M400 250 L530 325 L530 475 L400 550 L270 475 L270 325 Z" opacity="0.5" />
               <path d="M400 100 L660 250 L660 550 L400 700 L140 550 L140 250 Z" opacity="0.3" />
               <path d="M400,400 L100,100 M400,400 L700,100 M400,400 L100,700 M400,400 L700,700" opacity="0.2"/>
             </g>
             {/* Glowing Nodes */}
             <g className="fill-teal-500 dark:fill-teal-400 filter drop-shadow-[0_0_8px_rgba(45,212,191,0.6)]">
               <circle cx="400" cy="250" r="3"><animate attributeName="r" values="3;5;3" dur="4s" repeatCount="indefinite" /></circle>
               <circle cx="530" cy="475" r="3"><animate attributeName="r" values="3;5;3" dur="4s" begin="1s" repeatCount="indefinite" /></circle>
               <circle cx="270" cy="475" r="3"><animate attributeName="r" values="3;5;3" dur="4s" begin="2s" repeatCount="indefinite" /></circle>
             </g>
           </svg>
        </motion.div>

        {/* 3. Secondary Connecting Lines (Slow counter-drift for depth) */}
        <motion.div
             animate={{ x: [-50, 50, -50], y: [-20, 20, -20] }}
             transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 opacity-30 dark:opacity-20"
        >
             <svg viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M0,500 Q250,400 500,500 T1000,500 M0,300 Q400,500 800,300 M200,0 Q500,300 800,0" 
                      fill="none" stroke="url(#gradient-line)" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
                <defs>
                  <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#0d9488" stopOpacity="0" />
                    <stop offset="50%" stopColor="#0d9488" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                  </linearGradient>
                </defs>
            </svg>
        </motion.div>
      </div>


      {/* =========================================
          HERO CONTENT
      ========================================= */}
      <motion.section 
        style={{ y, opacity }}
        className="relative z-10 pt-36 pb-24 px-4 md:px-6 min-h-[90vh] flex flex-col items-center justify-center text-center"
      >
        {/* Glass Container to ensure text pops off the complex background */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="max-w-5xl mx-auto w-full bg-white/30 dark:bg-slate-900/30 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/40 dark:border-slate-800/50 shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
        >
          {/* Badge */}
          <motion.div 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-bold text-slate-700 dark:text-slate-300 mb-8"
          >
            <Sparkles className="w-3 h-3 text-teal-600 dark:text-teal-400" />
            <span className="tracking-wide uppercase">The Future of Philanthropy</span>
          </motion.div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-8 break-words drop-shadow-sm">
            Turn wealth into <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-cyan-500 to-indigo-600 dark:from-teal-400 dark:via-cyan-400 dark:to-indigo-400 relative">
              tangible impact.
              {/* Subtle underline glow effect */}
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-indigo-500/0 blur-[1px]"></span>
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-medium px-2">
            Direct peer-to-peer giving. No middlemen, no mystery. 
            See exactly who you help and watch the world change, one wish at a time.
          </p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full px-4"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-900 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl hover:shadow-2xl hover:shadow-teal-900/10 dark:hover:shadow-white/10"
            >
              Make a Wish
            </button>
            <button className="w-full sm:w-auto group px-10 py-5 rounded-full border-2 border-slate-900/10 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-sm"
            >
              View Leaderboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </motion.section>
      
      {/* Sections Layout - Sliding over the fixed background */}
      <div className="relative z-10 w-full overflow-hidden bg-white dark:bg-slate-950 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.1)] border-t border-slate-100/50 dark:border-slate-800/50">
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
