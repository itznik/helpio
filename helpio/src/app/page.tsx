'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import WishFeed from '@/components/sections/WishFeed';
import Leaderboard from '@/components/sections/Leaderboard';
import CreateWishModal from '@/components/features/CreateWishModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax Effect: Text moves slower than background
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <main className="min-h-screen relative flex flex-col">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* The Grid */}
        <div className="absolute inset-0 bg-grid opacity-[0.4]" />
        
        {/* The Spotlight (Sun/Moon Glow) */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-teal-500/20 dark:bg-teal-500/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 pt-32 pb-20 px-6 min-h-[90vh] flex flex-col items-center justify-center text-center">
        
        <motion.div style={{ y: y1, opacity }} className="max-w-4xl mx-auto">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-xs font-semibold text-slate-600 dark:text-slate-300 mb-8 mx-auto shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-teal-500" />
            <span>The Future of Philanthropy is Here</span>
          </motion.div>

          {/* Headline - Fixed Contrast */}
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-8">
            Turn wealth into <br />
            <span className="text-gradient">tangible impact.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Direct peer-to-peer giving. No middlemen, no mystery. 
            See exactly who you help and watch the world change, one wish at a time.
          </p>

          {/* Buttons - High Visibility */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-slate-900/20 dark:shadow-white/10"
            >
              Make a Wish
            </button>
            <button className="group px-8 py-4 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md text-slate-900 dark:text-white font-semibold text-lg hover:bg-white dark:hover:bg-white/10 transition-colors flex items-center gap-2">
              View Leaderboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </motion.div>
      </section>
      
      {/* Sections */}
      <div className="relative z-10 bg-gradient-to-b from-transparent to-white dark:to-slate-950">
        <WishFeed />
        <Leaderboard />
      </div>

      <CreateWishModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </main>
  );
}
