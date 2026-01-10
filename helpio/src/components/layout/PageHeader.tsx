'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge: string;
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <div className="relative pt-40 pb-24 px-6 overflow-hidden">
      
      {/* Background: The "Ripple" Architecture (Same as Home) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#020617] dark:via-[#0f172a] dark:to-[#020617]" />
         <div className="absolute inset-0 bg-grid opacity-[0.05] dark:opacity-[0.1]" />
         
         {/* Top Glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-teal-500/10 dark:bg-teal-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="container mx-auto text-center max-w-4xl relative z-10">
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4" />
          {badge}
        </motion.div>

        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-black text-slate-900 dark:text-white mb-8 tracking-tight"
        >
          {title}
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
