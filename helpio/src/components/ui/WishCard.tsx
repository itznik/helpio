'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, MoreHorizontal, Share2 } from 'lucide-react';

interface WishCardProps {
  name: string;
  avatar: string; // URL to image
  wish: string;
  story: string;
  amount: number;
  category: string;
  verified: boolean;
  colorIndex: number; // To vary the accent colors
}

export default function WishCard({ name, avatar, wish, story, amount, category, verified, colorIndex }: WishCardProps) {
  // Rotate through accent colors for visual variety
  const colors = [
    'from-teal-400 to-emerald-600',
    'from-purple-400 to-indigo-600',
    'from-rose-400 to-orange-500'
  ];
  const accentGradient = colors[colorIndex % colors.length];

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative p-1 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/10 shadow-2xl overflow-hidden"
    >
      {/* Internal Card Body */}
      <div className="bg-slate-900/80 h-full w-full rounded-[20px] p-6 flex flex-col justify-between relative z-10">
        
        {/* Header: User Info */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${accentGradient} p-[2px]`}>
              <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover border-2 border-slate-900" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm flex items-center gap-1">
                {name} 
                {verified && <CheckCircle2 className="w-3 h-3 text-teal-400" />}
              </h3>
              <span className="text-xs text-slate-400 uppercase tracking-wider">{category}</span>
            </div>
          </div>
          <button className="text-slate-500 hover:text-white transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* The Wish */}
        <div className="mb-6">
          <h4 className="text-xl font-display font-bold text-white mb-2 leading-tight">
            "{wish}"
          </h4>
          <p className="text-slate-400 text-sm line-clamp-3 leading-relaxed">
            {story}
          </p>
        </div>

        {/* Footer: Price & Action */}
        <div className="flex items-center justify-between mt-auto border-t border-white/5 pt-4">
          <div>
            <span className="block text-xs text-slate-500 mb-1">Cost</span>
            <span className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r ${accentGradient}`}>
              ${amount}
            </span>
          </div>
          
          <div className="flex gap-2">
             <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
               <Share2 className="w-4 h-4" />
             </button>
             <button className={`px-4 py-2 rounded-full bg-gradient-to-r ${accentGradient} text-white text-sm font-bold shadow-lg opacity-90 hover:opacity-100 hover:shadow-teal-500/25 transition-all`}>
               Grant Wish
             </button>
          </div>
        </div>
      </div>

      {/* Background Hover Glow Effect */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${accentGradient} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 -z-0 rounded-full translate-x-10 -translate-y-10`} />
    </motion.div>
  );
}
