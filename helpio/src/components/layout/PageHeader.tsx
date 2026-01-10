'use client';

import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  badge?: string;
}

export default function PageHeader({ title, subtitle, badge }: PageHeaderProps) {
  return (
    <div className="relative pt-40 pb-20 px-6 overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#020617] -z-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full -z-10" />
      <div className="absolute inset-0 bg-grid opacity-[0.05] dark:opacity-[0.1] -z-10" />

      <div className="container mx-auto text-center max-w-3xl">
        {badge && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-block px-4 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-8"
          >
            {badge}
          </motion.div>
        )}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-display font-black text-slate-900 dark:text-white mb-6"
        >
          {title}
        </motion.h1>
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  );
}
