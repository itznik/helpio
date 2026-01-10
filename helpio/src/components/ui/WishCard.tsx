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
}

export default function WishCard({ name, avatar, wish, story, amount, category, verified }: WishCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -6 }}
      className="h-full"
    >
      {/* Container: Explicit White BG in Light Mode */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 h-full flex flex-col relative z-10 shadow-sm hover:shadow-md transition-all group">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover border border-slate-100 dark:border-slate-800" />
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1">
                {name} 
                {verified && <CheckCircle2 className="w-3 h-3 text-teal-600 dark:text-teal-400" />}
              </h3>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{category}</span>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Wish Text: Explicit Black in Light Mode */}
        <div className="mb-6 flex-grow">
          <h4 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-3 leading-snug group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
            {wish}
          </h4>
          <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed font-medium">
            {story}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
          <div>
            <span className="block text-xs text-slate-500 font-semibold mb-0.5">Needed</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              ${amount}
            </span>
          </div>
          
          <div className="flex gap-2">
             <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors">
               <Share2 className="w-4 h-4" />
             </button>
             
             {/* Grant Button: Black BG in Light Mode */}
             <button className="px-5 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold shadow-sm hover:opacity-90 transition-opacity">
               Grant
             </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
