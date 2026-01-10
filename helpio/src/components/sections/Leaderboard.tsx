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
    <section className="relative overflow-hidden pb-20">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <Crown className="w-4 h-4" />
            Top Philanthropists
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">
            The <span className="text-gradient-gold">Hall of Fame</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-medium">
            Honoring those who have changed lives. These top donors have fulfilled over 500 wishes combined.
          </p>
        </div>

        {/* Podium */}
        <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-16 px-4">
          <PodiumCard donor={DONORS[1]} delay={0.2} height="h-64" color="border-slate-300 dark:border-slate-600 bg-white/80 dark:bg-slate-800" icon={<Medal className="w-6 h-6 text-slate-500 dark:text-slate-300" />} />
          <PodiumCard donor={DONORS[0]} delay={0} height="h-80" color="border-amber-400 bg-amber-50/80 dark:bg-amber-900/20" icon={<Trophy className="w-8 h-8 text-amber-500" />} isFirst />
          <PodiumCard donor={DONORS[2]} delay={0.4} height="h-56" color="border-orange-300 dark:border-orange-800 bg-orange-50/80 dark:bg-orange-900/10" icon={<Medal className="w-6 h-6 text-orange-600" />} />
        </div>

        {/* List */}
        <div className="max-w-3xl mx-auto space-y-3">
          {DONORS.slice(3).map((donor, index) => (
            <motion.div
              key={donor.rank}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (index * 0.1) }}
              className="flex items-center justify-between p-4 rounded-xl glass-panel group"
            >
              <div className="flex items-center gap-4">
                <span className="font-display font-bold text-slate-400 w-6 text-center text-lg">#{donor.rank}</span>
                <img src={donor.avatar} alt={donor.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10" />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">{donor.name}</h4>
                  <span className="text-xs text-slate-500 font-medium">{donor.badge}</span>
                </div>
              </div>
              <div className="text-right">
                 <div className="font-bold text-slate-900 dark:text-white">${donor.amount.toLocaleString()}</div>
                 <div className="text-xs text-slate-500">Donated</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PodiumCard({ donor, delay, height, color, icon, isFirst = false }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={`relative flex flex-col items-center justify-end w-full md:w-44 ${height} rounded-t-3xl border-t border-x ${color} backdrop-blur-md pb-6 shadow-sm`}
    >
      <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 ${isFirst ? 'border-amber-400' : 'border-slate-200 dark:border-slate-700'} overflow-hidden bg-white dark:bg-slate-900 shadow-md`}>
        <img src={donor.avatar} alt={donor.name} className="w-full h-full object-cover" />
      </div>
      <div className="mb-3">{icon}</div>
      <h3 className={`font-bold text-lg ${isFirst ? 'text-amber-700 dark:text-amber-300' : 'text-slate-900 dark:text-white'}`}>{donor.name}</h3>
      <p className="text-slate-500 text-sm mb-2 font-medium">{donor.badge}</p>
      <div className={`px-4 py-1 rounded-full text-sm font-bold shadow-sm ${isFirst ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white'}`}>
        ${donor.amount.toLocaleString()}
      </div>
    </motion.div>
  );
}
