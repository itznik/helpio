'use client';

import { motion } from 'framer-motion';
import { Search, HeartHandshake, Sparkles } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: "Browse & Connect",
    desc: "Explore verified wishes from people in your community. Filter by category, urgency, or location to find a story that resonates.",
    icon: <Search className="w-8 h-8 text-teal-600 dark:text-teal-400" />,
  },
  {
    id: 2,
    title: "Direct Giving",
    desc: "Fund a wish partially or in full. No platform fees for donors—100% of your contribution goes directly to the need.",
    icon: <HeartHandshake className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
  },
  {
    id: 3,
    title: "See the Impact",
    desc: "Receive updates, photos, and thank-you notes from the person you helped. Witness the tangible difference you made.",
    icon: <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950/50">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6">
            Simple steps, <span className="text-teal-600 dark:text-teal-400">massive impact.</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            We stripped away the complexity of traditional charity. 
            Here is how you can change a life in under 5 minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-teal-200 via-amber-200 to-indigo-200 dark:from-teal-900 dark:via-amber-900 dark:to-indigo-900 -z-10" />

          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Icon Bubble */}
              <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-300">
                <div className="absolute inset-0 rounded-full bg-slate-100 dark:bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                {step.icon}
                {/* Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center text-sm shadow-lg">
                  {step.id}
                </div>
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
