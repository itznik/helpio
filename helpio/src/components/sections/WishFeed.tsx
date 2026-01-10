'use client';

import { motion } from 'framer-motion';
import { Share2, ArrowRight, ShieldCheck, MoreHorizontal } from 'lucide-react';

const WISHES = [
  {
    id: 1,
    user: "Aarav P.",
    avatar: "https://i.pravatar.cc/150?u=12",
    tag: "Education",
    title: "Laptop for Coding Bootcamp",
    desc: "I have been learning Python on my phone for 6 months. I need a laptop to compile code efficiently.",
    raised: 450,
    goal: 600,
    verified: true,
  },
  {
    id: 2,
    user: "Sarah M.",
    avatar: "https://i.pravatar.cc/150?u=23",
    tag: "Health",
    title: "Wheelchair Repair Kit",
    desc: "My wheelchair's left wheel is damaged. I just need the parts to fix it myself so I can get to work.",
    raised: 120,
    goal: 300,
    verified: true,
  },
  {
    id: 3,
    user: "Davide B.",
    avatar: "https://i.pravatar.cc/150?u=34",
    tag: "Career",
    title: "Art Supplies for Portfolio",
    desc: "I am a digital artist trying to get commissions. My drawing tablet broke last week.",
    raised: 85,
    goal: 200,
    verified: false,
  },
];

export default function WishFeed() {
  return (
    <section id="wish-feed" className="py-24 relative bg-slate-50/50 dark:bg-[#0B1120]/50">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
              Latest Requests
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              Real people. Real needs. <span className="text-teal-600 dark:text-teal-400 font-bold">Verified impact.</span>
            </p>
          </div>
          <button className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-bold hover:gap-3 transition-all">
            View all categories <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WISHES.map((wish, index) => (
            <WishCard key={wish.id} wish={wish} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

function WishCard({ wish, index }: any) {
  const percentage = Math.min((wish.raised / wish.goal) * 100, 100);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img src={wish.avatar} alt={wish.user} className="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-700" />
          <div>
            <div className="flex items-center gap-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{wish.user}</h4>
              {wish.verified && <ShieldCheck className="w-3 h-3 text-teal-500" />}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{wish.tag}</span>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
        {wish.title}
      </h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
        {wish.desc}
      </p>

      {/* Progress */}
      <div className="mt-auto">
        <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
           <span className="text-slate-900 dark:text-white">${wish.raised} raised</span>
           <span>${wish.goal} goal</span>
        </div>
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-teal-400 to-teal-600 rounded-full" 
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="flex-1 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm hover:opacity-90 transition-opacity">
            Grant Wish
          </button>
          <button className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
