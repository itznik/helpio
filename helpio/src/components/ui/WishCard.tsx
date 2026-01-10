'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, MoreHorizontal, Share2 } from 'lucide-react';

interface WishCardProps {
  name: string;
  avatar: string;
  wish: string;
  story: string;
  amount: number;
  category: string;
  verified: boolean;
  colorIndex: number;
}

export default function WishCard({ name, avatar, wish, story, amount, category, verified }: WishCardProps) {

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative h-full flex flex-col"
    >
      {/* The Card Itself - Now uses global variables for color */}
      <div className="glass-panel rounded-3xl p-6 h-full flex flex-col relative z-10 transition-colors hover:border-teal-500/30">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-white/10" />
            <div>
              {/* Text Color Fixed: Uses slate-900 in light, white in dark */}
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1">
                {name} 
                {verified && <CheckCircle2 className="w-3 h-3 text-teal-500" />}
              </h3>
              <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{category}</span>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* The Wish */}
        <div className="mb-6 flex-grow">
          <h4 className="text-lg font-display font-bold text-slate-900 dark:text-white mb-3 leading-snug">
  "{wish}"
</h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed">
            {story}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/5 mt-auto">
          <div>
            <span className="block text-xs text-slate-400 mb-0.5">Needed</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
  ${amount}
</span>
          </div>
          
          <div className="flex gap-2">
             <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 transition-colors">
               <Share2 className="w-4 h-4" />
             </button>
             <button className="px-4 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-lg">
  Grant
</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
