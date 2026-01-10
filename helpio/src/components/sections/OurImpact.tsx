'use client';

import { motion } from 'framer-motion';

const STATS = [
  { label: "Total Donated", value: "$2.4M+", color: "text-emerald-600 dark:text-emerald-400" },
  { label: "Wishes Granted", value: "8,500", color: "text-blue-600 dark:text-blue-400" },
  { label: "Communities", value: "142", color: "text-amber-600 dark:text-amber-400" },
  { label: "Success Rate", value: "94%", color: "text-purple-600 dark:text-purple-400" },
];

export default function OurImpact() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
            Real Numbers. <span className="text-emerald-600 dark:text-emerald-400">Real Change.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Transparency is at our core. We track every dollar and every outcome.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center mb-20">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex flex-col justify-center items-center h-full"
            >
              {/* FIX: 
                  - Mobile: break-words (Wraps if screen is tiny)
                  - Desktop: whitespace-nowrap (Forces 1 line, prevents height stretching) 
              */}
              <div className={`text-2xl sm:text-3xl md:text-5xl font-bold mb-2 break-words md:whitespace-nowrap w-full md:w-auto ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-slate-900 dark:bg-white overflow-hidden relative px-8 py-16 text-center shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-4xl font-bold text-white dark:text-slate-900 mb-6">
              Ready to make your first impact?
            </h3>
            <p className="text-slate-300 dark:text-slate-600 mb-8 max-w-xl mx-auto text-lg">
              Join thousands of others who are changing the world, one small wish at a time.
            </p>
            <button className="px-8 py-4 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg hover:scale-105 transition-transform shadow-xl">
              Start Granting Today
            </button>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
            <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-teal-500 rounded-full blur-[100px]" />
            <div className="absolute bottom-[-50%] right-[-20%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[100px]" />
          </div>
        </div>

      </div>
    </section>
  );
}
