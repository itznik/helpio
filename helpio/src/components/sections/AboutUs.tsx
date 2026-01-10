'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users, Heart } from 'lucide-react';

export default function AboutUs() {
  return (
    <section className="py-32 relative overflow-hidden">
        {/* subtle grid background for this section */}
        <div className="absolute inset-0 bg-grid opacity-[0.03] dark:opacity-[0.07] pointer-events-none" />

      <div className="container mx-auto px-6">
        
        {/* The "Orbital" Layout Container */}
        <div className="relative max-w-6xl mx-auto min-h-[600px] flex items-center justify-center">
          
          {/* CENTER: The Core Mission Text */}
          <div className="relative z-20 text-center max-w-2xl">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6"
            >
              Our Mission
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-8 leading-tight">
              Bridging the gap between <span className="text-indigo-600 dark:text-indigo-400">empathy and action.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
              We started Helpio to remove the middlemen from charity. We are building a world where helping your neighbor is as easy, transparent, and direct as sending a text.
            </p>
            <button className="inline-flex items-center gap-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 py-3 px-8 rounded-full transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
              Read our full manifesto <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* ORBITAL ELEMENTS (Floating visually around the center text) */}
          
          {/* Orbit 1: Top Left - Trust Indicator */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-0 left-0 md:left-[5%] lg:-left-[10%] z-10 hidden md:block"
          >
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-slate-100 dark:border-slate-700 flex items-center gap-3 max-w-[200px]">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                    <p className="font-bold text-sm text-slate-900 dark:text-white">100% Vetted</p>
                    <p className="text-[10px] text-slate-500">Secure & Authentic</p>
                </div>
            </div>
            {/* Connector Line */}
            <svg className="absolute top-1/2 left-full w-24 h-24 text-indigo-200 dark:text-indigo-800 -z-10" viewBox="0 0 100 100" fill="none"><path d="M0,50 Q50,50 100,100" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" /></svg>
          </motion.div>

           {/* Orbit 2: Bottom Right - Community Image Card */}
           <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-0 right-0 md:right-[5%] lg:-right-[5%] z-30 hidden md:block"
          >
             {/* A sleek, tilted image card */}
            <div className="relative w-64 h-48 rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 transform rotate-6 hover:rotate-0 transition-all duration-500">
               <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=500" className="w-full h-full object-cover" alt="Community" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                 <p className="text-white font-bold">Community Driven</p>
               </div>
            </div>
          </motion.div>

           {/* Orbit 3: Top Right - Impact Stat Bubble */}
           <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="absolute top-[10%] right-[10%] lg:right-[5%] z-10 hidden md:flex items-center justify-center"
          >
             <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex flex-col items-center justify-center shadow-xl p-4 text-center animate-float-slow">
                <Heart className="w-6 h-6 mb-1 fill-white/50" />
                <span className="font-display font-bold text-2xl leading-none">12K+</span>
                <span className="text-[10px] font-medium opacity-80">Lives Changed</span>
             </div>
          </motion.div>

           {/* Background Orbital Rings (Subtle Visual Structure) */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
             <div className="w-[500px] h-[500px] rounded-full border border-indigo-100/50 dark:border-indigo-900/30 absolute" />
             <div className="w-[800px] h-[800px] rounded-full border border-indigo-50/50 dark:border-indigo-900/20 absolute opacity-70" />
           </div>

        </div>
      </div>
    </section>
  );
}
