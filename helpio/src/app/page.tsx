'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, Heart } from 'lucide-react';

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
  const y = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <main className="min-h-screen relative flex flex-col overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      
      {/* =========================================
          BACKGROUND: SUBTLE & CLEAN
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-white to-slate-50 dark:from-teal-950/20 dark:via-[#020617] dark:to-[#020617]" />
        <div className="absolute inset-0 bg-grid opacity-[0.05] dark:opacity-[0.1]" />
      </div>


      {/* =========================================
          HERO SECTION
      ========================================= */}
      <section className="relative z-10 pt-32 pb-20 px-4 md:px-6 min-h-[90vh] flex flex-col items-center">
        
        {/* 1. TEXT CONTENT (Top) */}
        <motion.div 
           style={{ y }}
           className="text-center max-w-4xl mx-auto mb-16 relative z-20"
        >
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold text-teal-600 dark:text-teal-400 mb-8 uppercase tracking-widest"
          >
            <Sparkles className="w-4 h-4" />
            <span>The Future of Philanthropy</span>
          </motion.div>

          <motion.h1 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.1 }}
             className="text-5xl sm:text-6xl md:text-8xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.05] mb-8"
          >
            Turn wealth into <br />
            <span className="text-teal-600 dark:text-teal-400">tangible impact.</span>
          </motion.h1>

          <motion.p 
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Direct peer-to-peer giving. No middlemen, no mystery. 
            See exactly who you help and watch the world change.
          </motion.p>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:scale-105 transition-all shadow-xl"
            >
              Make a Wish
            </button>
            <button className="px-8 py-4 rounded-full border border-slate-300 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-900 dark:text-white font-bold text-lg hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              View Leaderboard <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </motion.div>


        {/* 2. VISUAL COMPOSITION (The "Stunning" Graphic) */}
        <div className="relative w-full max-w-6xl mx-auto h-[500px] md:h-[700px] mt-8 select-none pointer-events-none md:pointer-events-auto">
          
          {/* A. Background Organic Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-b from-teal-100/50 to-indigo-100/50 dark:from-teal-900/20 dark:to-indigo-900/20 blur-[100px] rounded-full -z-10" />
          
          {/* B. Central Person Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[450px] z-10"
          >
             {/* Masked Image Container */}
             <div className="relative rounded-t-[3rem] overflow-hidden shadow-2xl border-t-4 border-x-4 border-white dark:border-slate-800">
               <img 
                 src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
                 alt="Smiling Professional" 
                 className="w-full h-auto object-cover transform scale-110 hover:scale-105 transition-transform duration-700"
               />
               {/* Gradient Overlay at bottom to fade into section below */}
               <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-[#020617] to-transparent" />
             </div>
          </motion.div>


          {/* C. Floating Cards & Connectors */}
          
          {/* Card 1: The Goal (Top Left) */}
          <FloatingCard 
            className="absolute top-[5%] left-[5%] md:left-[15%] z-20"
            delay={0.6}
            animate={{ y: [0, -15, 0] }}
          >
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/50 rounded-lg flex items-center justify-center text-teal-600 dark:text-teal-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Laptop for Coding</h3>
                <div className="w-32 h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-teal-500 w-[70%]" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-bold">
                  <span>$450 raised</span>
                  <span>Goal: $600</span>
                </div>
              </div>
            </div>
          </FloatingCard>

          {/* Connection Arrow 1 */}
          <svg className="absolute top-[18%] left-[28%] w-32 h-32 text-teal-300 dark:text-teal-700 hidden md:block z-0" viewBox="0 0 100 100" fill="none">
             <path d="M10,10 Q50,50 90,90" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arrowhead)" />
          </svg>


          {/* Card 2: The Outcome (Top Right) */}
          <FloatingCard 
            className="absolute top-[10%] right-[5%] md:right-[15%] z-20"
            delay={0.8}
            animate={{ y: [0, 15, 0] }}
          >
            <div className="relative w-48 h-32 rounded-lg overflow-hidden mb-3">
              <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold shadow-sm">
                Purchased!
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Verified Delivery</span>
            </div>
          </FloatingCard>

           {/* Connection Arrow 2 */}
           <svg className="absolute top-[35%] right-[28%] w-24 h-24 text-indigo-300 dark:text-indigo-700 hidden md:block z-0" viewBox="0 0 100 100" fill="none">
             <path d="M90,10 Q50,50 10,90" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          </svg>


          {/* Card 3: The Gratitude (Bottom Left) */}
          <FloatingCard 
            className="absolute bottom-[20%] left-[2%] md:left-[10%] z-30"
            delay={1.0}
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          >
            <div className="flex items-start gap-3 max-w-[200px]">
              <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden flex-shrink-0 border border-white shadow-sm">
                <img src="https://i.pravatar.cc/150?u=5" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700">
                <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                  "Thanks to Elena R. for enabling my dream! I finally deployed my first app."
                </p>
                <div className="flex gap-1 mt-2">
                  <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                  <span className="text-[10px] text-slate-400">Just now</span>
                </div>
              </div>
            </div>
          </FloatingCard>

          {/* Card 4: Community (Bottom Right) */}
          <FloatingCard 
            className="absolute bottom-[15%] right-[2%] md:right-[10%] z-30"
            delay={1.2}
            animate={{ y: [0, 10, 0] }}
          >
             <div className="flex gap-3 items-center">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                </div>
                <div>
                   <h4 className="font-bold text-slate-900 dark:text-white text-sm">Community Garden</h4>
                   <p className="text-[10px] text-slate-500">New project in Surat</p>
                </div>
                <div className="flex -space-x-2 ml-2">
                   <img className="w-6 h-6 rounded-full border border-white" src="https://i.pravatar.cc/100?u=1" />
                   <img className="w-6 h-6 rounded-full border border-white" src="https://i.pravatar.cc/100?u=2" />
                   <img className="w-6 h-6 rounded-full border border-white" src="https://i.pravatar.cc/100?u=3" />
                </div>
             </div>
          </FloatingCard>

        </div>
      </section>
      
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

// Reusable Floating Card Component for cleaner code
function FloatingCard({ children, className, delay, animate }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      <motion.div
        animate={animate}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/50 dark:border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
