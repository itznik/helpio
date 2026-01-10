'use client';

import { motion } from 'framer-motion';
import { Activity, Globe, HeartHandshake, TrendingUp } from 'lucide-react';

// Data with specific icons
const STATS = [
  { label: "Total Donated", value: 2400000, prefix: "$", color: "text-emerald-500", icon: TrendingUp },
  { label: "Wishes Granted", value: 8500, prefix: "", color: "text-blue-500", icon: HeartHandshake },
  { label: "Communities", value: 142, prefix: "", color: "text-amber-500", icon: Globe },
  { label: "Success Rate", value: 94, suffix: "%", prefix: "", color: "text-purple-500", icon: Activity },
];

// Number formatter
const formatCompactNumber = (number: number) => {
  if (number >= 1000000) return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (number >= 1000) return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return number.toString();
};

export default function OurImpact() {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
            Real Numbers. <span className="text-emerald-600 dark:text-emerald-400">Real Change.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
            We believe in radical transparency. Here is the live footprint of our community.
          </p>
        </div>

        {/* === THE IMPACT CONSOLE (New Visual) === */}
        <div className="max-w-5xl mx-auto mb-20">
          {/* Glassmorphic Dashboard Container */}
          <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] border border-white/50 dark:border-slate-700 shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden">
            
            {/* Background Dashboard Graphic (Subtle lines/map) */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
               <svg className="w-full h-full" viewBox="0 0 1000 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M0 300 Q 250 100 500 300 Q 750 500 1000 200" stroke="currentColor" strokeWidth="2" className="text-slate-900 dark:text-white" fill="none" />
                 <path d="M0 350 Q 300 200 600 350 Q 900 500 1200 250" stroke="currentColor" strokeWidth="1" className="text-slate-500 dark:text-slate-400" fill="none" opacity="0.5" />
               </svg>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 relative z-10 divide-x divide-slate-100 dark:divide-slate-800/50">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 flex flex-col items-center text-center group hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  {/* Icon Bubble */}
                  <div className={`w-12 h-12 mb-4 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  
                  {/* Number */}
                  <div className={`text-3xl sm:text-4xl md:text-5xl font-display font-black mb-2 break-words md:whitespace-nowrap ${stat.color}`}>
                    {stat.prefix}
                    {formatCompactNumber(stat.value)}
                    {stat.suffix || ''}
                  </div>
                  
                  {/* Label */}
                  <div className="text-xs md:text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {/* === END CONSOLE === */}


        {/* CTA Banner - Remained similar but cleaned up to match the new console above */}
        <div className="rounded-[2.5rem] bg-slate-900 dark:bg-white overflow-hidden relative px-8 py-20 text-center shadow-2xl mx-auto max-w-5xl">
          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white dark:text-slate-900 mb-6 leading-tight">
              Ready to make your first impact?
            </h3>
            <p className="text-slate-300 dark:text-slate-600 mb-10 max-w-xl mx-auto text-xl">
              Join thousands of others who are changing the world, one small wish at a time.
            </p>
            <button className="px-10 py-5 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xl hover:scale-105 hover:shadow-xl transition-all">
              Start Granting Today
            </button>
          </div>
          
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none mix-blend-screen dark:mix-blend-multiply">
            <div className="absolute top-[-50%] left-[-20%] w-[600px] h-[600px] bg-teal-500 dark:bg-teal-300 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] bg-indigo-500 dark:bg-indigo-300 rounded-full blur-[120px]" />
          </div>
        </div>

      </div>
    </section>
  );
}
