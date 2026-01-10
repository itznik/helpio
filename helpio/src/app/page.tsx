'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, Heart, Gift } from 'lucide-react';

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
  const y = useTransform(scrollY, [0, 500], [0, 50]);

  return (
    <main className="min-h-screen relative flex flex-col overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      
      {/* =========================================
          BACKGROUND: Clean & Premium
      ========================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Ambient Gradient */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-teal-200/20 dark:bg-teal-900/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-200/20 dark:bg-indigo-900/10 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-grid opacity-[0.04] dark:opacity-[0.08]" />
      </div>


      {/* =========================================
          HERO SECTION (Split Layout)
      ========================================= */}
      <section className="relative z-10 pt-28 pb-12 lg:pt-40 lg:pb-24 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* LEFT COLUMN: TEXT CONTENT */}
          <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8 }}
             className="text-center lg:text-left relative z-20 order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold text-teal-600 dark:text-teal-400 mb-8 uppercase tracking-widest mx-auto lg:mx-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Direct Peer-to-Peer Giving</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-8">
              Make a wish. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600 dark:from-teal-400 dark:to-indigo-400">
                Grant a future.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              We connect people who need help directly with people who want to give. 
              100% transparency. 0% platform fees for donors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:translate-y-[-2px] hover:shadow-xl transition-all"
              >
                Start Granting
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white font-bold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                How it works <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Social Proof Mini-Section */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                   <img key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900" src={`https://i.pravatar.cc/100?u=${i+10}`} alt="User" />
                ))}
              </div>
              <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-900 dark:text-white">2,000+</span> wishes granted this month.
              </div>
            </div>
          </motion.div>


          {/* RIGHT COLUMN: VISUAL COMPOSITION */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="relative order-1 lg:order-2 h-[500px] lg:h-[650px] w-full flex items-center justify-center"
          >
             {/* 1. The Arch Image (Main Protagonist) */}
             <div className="relative w-[320px] md:w-[400px] h-[450px] md:h-[550px]">
                {/* Background Decoration */}
                <div className="absolute top-4 -right-4 w-full h-full rounded-t-[10rem] rounded-b-[3rem] border-2 border-dashed border-slate-300 dark:border-slate-700 z-0" />
                
                {/* Main Image Container */}
                <div className="absolute inset-0 rounded-t-[10rem] rounded-b-[3rem] overflow-hidden shadow-2xl z-10 bg-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop" 
                    alt="Happy Person" 
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-1000"
                  />
                  {/* Gradient Overlay for text contrast if needed */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
                </div>

                {/* 2. Floating Card: THE WISH (Left) */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[15%] -left-[10%] md:-left-[20%] z-20 w-[180px] md:w-[220px]"
                >
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700">
                    <div className="flex items-center gap-3 mb-3">
                       <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                         <Gift className="w-5 h-5" />
                       </div>
                       <div>
                         <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Wish</p>
                         <p className="text-xs font-bold text-slate-900 dark:text-white">Camera Lens</p>
                       </div>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                       <div className="w-[85%] h-full bg-teal-500" />
                    </div>
                    <div className="flex justify-between mt-1 text-[10px] font-medium text-slate-500">
                       <span>$850 raised</span>
                       <span>85%</span>
                    </div>
                  </div>
                </motion.div>

                {/* 3. Floating Card: THE IMPACT (Right) */}
                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-[15%] -right-[5%] md:-right-[15%] z-20 w-[200px]"
                >
                  <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/50 dark:border-slate-700">
                    <div className="relative h-24 rounded-lg overflow-hidden mb-3 group">
                       <img src="https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=300" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                       <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-white" />
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <img src="https://i.pravatar.cc/100?u=22" className="w-6 h-6 rounded-full border border-white" />
                       <div>
                         <p className="text-xs font-bold text-slate-900 dark:text-white">Verified Impact</p>
                         <p className="text-[10px] text-slate-500">Delivered 2h ago</p>
                       </div>
                    </div>
                  </div>
                </motion.div>

             </div>
          </motion.div>

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
