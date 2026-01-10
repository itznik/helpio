'use client';

import { motion } from 'framer-motion';
import { Search, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: "Discover & Connect",
    desc: "Browse verified stories. Find a wish that speaks to your heart.",
    icon: Search,
    color: "teal"
  },
  {
    id: 2,
    title: "Give Directly",
    desc: "Fund the wish. 100% goes to the need. No platform fees.",
    icon: HeartHandshake,
    color: "indigo"
  },
  {
    id: 3,
    title: "Witness Impact",
    desc: "See photo updates and the real-world change you created.",
    icon: Sparkles,
    color: "purple"
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decorative blobs for depth */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-teal-100/40 dark:bg-teal-900/20 blur-[120px] rounded-full -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-100/40 dark:bg-indigo-900/20 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-24">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
            Simple steps, <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-indigo-600 dark:from-teal-400 dark:to-indigo-400">massive impact.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            We've removed the friction from philanthropy. Here's your path to changing a life in minutes.
          </p>
        </div>

        {/* VISUAL PATH JOURNEY */}
        <div className="relative max-w-5xl mx-auto">
          {/* The Winding Path SVG (Hidden on small screens, visible on md+) */}
          <svg className="absolute top-[60px] left-0 w-full h-auto hidden md:block z-0 pointer-events-none" viewBox="0 0 900 200" fill="none" preserveAspectRatio="none">
            <path d="M50,80 C250,80 250,180 450,180 C650,180 650,80 850,80" stroke="url(#grad-path)" strokeWidth="3" strokeDasharray="8 8" strokeLinecap="round" />
            <defs>
              <linearGradient id="grad-path" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className="stop-teal-400" stopOpacity="0.5" />
                <stop offset="50%" className="stop-indigo-400" stopOpacity="0.5" />
                <stop offset="100%" className="stop-purple-400" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                // Alternating vertical positions for a "floating" feel on desktop
                className={`relative flex flex-col items-center text-center ${index % 2 === 1 ? 'md:mt-24' : ''}`}
              >
                {/* Floating Glass Card */}
                <div className="group bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-slate-700 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 relative transition-all hover:-translate-y-2 hover:shadow-2xl">
                  
                  {/* Floating Number Badge */}
                  <div className={`absolute -top-5 -left-5 w-12 h-12 rounded-2xl bg-gradient-to-br from-${step.color}-500 to-${step.color}-700 text-white font-display font-bold text-xl flex items-center justify-center shadow-lg transform rotate-[-10deg] group-hover:rotate-0 transition-all`}>
                    {step.id}
                  </div>
                  
                  {/* Icon Blob */}
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-${step.color}-100 dark:bg-${step.color}-900/30 flex items-center justify-center text-${step.color}-600 dark:text-${step.color}-400 relative overflow-hidden`}>
                    <step.icon className="w-10 h-10 relative z-10" />
                    {/* Background pulsing ring */}
                    <div className={`absolute inset-0 bg-${step.color}-200/50 dark:bg-${step.color}-800/50 rounded-2xl animate-ping opacity-30`} />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                
                {/* Arrow connector for mobile */}
                {index < STEPS.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-slate-300 dark:text-slate-700 mt-6 md:hidden rotate-90" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
