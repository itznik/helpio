'use client';

import { motion } from 'framer-motion';
import { Crown, Trophy, Medal } from 'lucide-react';

const DONORS = [
  { rank: 1, name: "Alexander V.", amount: 15420, avatar: "https://i.pravatar.cc/150?u=1", badge: "Legend" },
  { rank: 2, name: "Elena R.", amount: 8950, avatar: "https://i.pravatar.cc/150?u=2", badge: "Hero" },
  { rank: 3, name: "Marcus Chen", amount: 6200, avatar: "https://i.pravatar.cc/150?u=3", badge: "Guardian" },
  { rank: 4, name: "Sarah J.", amount: 4100, avatar: "https://i.pravatar.cc/150?u=4", badge: "Patron" },
  { rank: 5, name: "David K.", amount: 3800, avatar: "https://i.pravatar.cc/150?u=5", badge: "Patron" },
  { rank: 6, name: "Dr. O'Neil", amount: 2500, avatar: "https://i.pravatar.cc/150?u=6", badge: "Supporter" },
];

export default function Leaderboard() {
  return (
    <section id="leaderboard" className="relative overflow-hidden py-32">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Crown className="w-4 h-4" />
            Top Philanthropists
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-slate-900 dark:text-white mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">Hall of Fame</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium">
            Honoring those who have changed lives. These top donors have fulfilled over 500 wishes combined.
          </p>
        </div>

        {/* PODIUM VISUAL */}
        <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8 mb-20">
          
          {/* 2nd Place */}
          <PodiumCard 
            donor={DONORS[1]} 
            rank={2}
            delay={0.2} 
            height="h-64" 
            color="from-slate-300 to-slate-400" 
            border="border-slate-300"
            icon={<Medal className="w-6 h-6 text-slate-500" />} 
            orderClass="order-2 md:order-1" 
          />

          {/* 1st Place */}
          <PodiumCard 
            donor={DONORS[0]} 
            rank={1}
            delay={0} 
            height="h-80" 
            color="from-amber-300 to-amber-500" 
            border="border-amber-400"
            icon={<Trophy className="w-10 h-10 text-amber-700" />} 
            isFirst 
            orderClass="order-1 md:order-2" 
          />

          {/* 3rd Place */}
          <PodiumCard 
            donor={DONORS[2]} 
            rank={3}
            delay={0.4} 
            height="h-56" 
            color="from-orange-300 to-orange-400" 
            border="border-orange-300"
            icon={<Medal className="w-6 h-6 text-orange-700" />} 
            orderClass="order-3 md:order-3" 
          />
        </div>

        {/* LIST VISUAL (Glass Strips) */}
        <div className="max-w-3xl mx-auto space-y-4">
          {DONORS.slice(3).map((donor, index) => (
            <motion.div
              key={donor.rank}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (index * 0.1) }}
              className="group flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-amber-500/30 transition-all hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg"
            >
              <div className="flex items-center gap-4 md:gap-6">
                <span className="font-display font-bold text-slate-300 dark:text-slate-700 w-8 text-center text-xl">#{donor.rank}</span>
                <img src={donor.avatar} alt={donor.name} className="w-12 h-12 rounded-full border-2 border-slate-100 dark:border-slate-700" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-amber-600 transition-colors">{donor.name}</h4>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{donor.badge}</span>
                </div>
              </div>
              <div className="text-right">
                 <div className="font-bold text-slate-900 dark:text-white text-lg">${donor.amount.toLocaleString()}</div>
                 <div className="text-xs text-slate-500 font-bold uppercase">Donated</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function PodiumCard({ donor, rank, delay, height, color, border, icon, isFirst = false, orderClass }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, type: "spring" }}
      className={`relative flex flex-col items-center justify-end w-full md:w-56 ${height} ${orderClass} rounded-t-[2.5rem] rounded-b-3xl ${isFirst ? 'bg-gradient-to-b from-amber-50/50 to-white dark:from-amber-900/20 dark:to-slate-900' : 'bg-white/50 dark:bg-slate-900/50'} border-t-4 border-x border-b ${isFirst ? 'border-amber-400 dark:border-amber-600 shadow-[0_-10px_40px_rgba(251,191,36,0.3)]' : 'border-slate-200 dark:border-slate-700'} backdrop-blur-sm pb-8`}
    >
      {/* Floating Avatar */}
      <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full p-1 bg-gradient-to-br ${color} shadow-xl`}>
         <img src={donor.avatar} alt={donor.name} className="w-full h-full rounded-full object-cover border-4 border-white dark:border-slate-900" />
         <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            #{rank}
         </div>
      </div>

      <div className="mb-4">{icon}</div>
      <h3 className={`font-bold text-xl ${isFirst ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>{donor.name}</h3>
      <p className="text-slate-500 text-sm mb-4 font-bold uppercase tracking-wider">{donor.badge}</p>
      
      <div className={`px-6 py-2 rounded-full text-lg font-bold shadow-sm ${isFirst ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
        ${donor.amount.toLocaleString()}
      </div>
    </motion.div>
  );
}
