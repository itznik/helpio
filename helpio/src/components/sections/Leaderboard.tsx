'use client';

import { motion } from 'framer-motion';
import { Crown, Trophy, Medal, Star } from 'lucide-react';

// Mock Data for the Top 50 (We show top 7 for now)
const DONORS = [
  { rank: 1, name: "Alexander V.", amount: 15420, avatar: "https://i.pravatar.cc/150?u=1", badge: "Legend" },
  { rank: 2, name: "Elena R.", amount: 8950, avatar: "https://i.pravatar.cc/150?u=2", badge: "Hero" },
  { rank: 3, name: "Marcus Chen", amount: 6200, avatar: "https://i.pravatar.cc/150?u=3", badge: "Guardian" },
  { rank: 4, name: "Sarah J.", amount: 4100, avatar: "https://i.pravatar.cc/150?u=4", badge: "Patron" },
  { rank: 5, name: "David K.", amount: 3800, avatar: "https://i.pravatar.cc/150?u=5", badge: "Patron" },
  { rank: 6, name: "Dr. O'Neil", amount: 2500, avatar: "https://i.pravatar.cc/150?u=6", badge: "Supporter" },
  { rank: 7, name: "CryptoFund DAO", amount: 2100, avatar: "https://i.pravatar.cc/150?u=7", badge: "Supporter" },
];

export default function Leaderboard() {
  return (
    <section className="py-24 relative overflow-hidden">
      
      {/* Background Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Crown className="w-4 h-4" />
            Top Philanthropists
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            The <span className="text-gradient-gold">Hall of Fame</span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Honoring those who have changed lives. These top donors have fulfilled over 500 wishes combined.
          </p>
        </div>

        {/* The Podium (Top 3) */}
        <div className="flex flex-col md:flex-row justify-center items-end gap-6 mb-16 px-4">
          
          {/* Rank 2 */}
          <PodiumCard donor={DONORS[1]} delay={0.2} height="h-64" color="border-slate-400 bg-slate-400/10" icon={<Medal className="w-6 h-6 text-slate-300" />} />
          
          {/* Rank 1 (Center, Tallest, Gold) */}
          <PodiumCard donor={DONORS[0]} delay={0} height="h-80" color="border-amber-400 bg-amber-500/20" icon={<Trophy className="w-8 h-8 text-amber-400" />} isFirst />
          
          {/* Rank 3 */}
          <PodiumCard donor={DONORS[2]} delay={0.4} height="h-56" color="border-orange-700 bg-orange-700/10" icon={<Medal className="w-6 h-6 text-orange-600" />} />
          
        </div>

        {/* The List (Rank 4+) */}
        <div className="max-w-3xl mx-auto space-y-3">
          {DONORS.slice(3).map((donor, index) => (
            <motion.div
              key={donor.rank}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (index * 0.1) }}
              className="flex items-center justify-between p-4 rounded-xl glass-panel hover:bg-white/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <span className="font-display font-bold text-slate-500 w-6 text-center text-lg">#{donor.rank}</span>
                <img src={donor.avatar} alt={donor.name} className="w-10 h-10 rounded-full border border-white/10" />
                <div>
                  <h4 className="font-bold text-white group-hover:text-amber-300 transition-colors">{donor.name}</h4>
                  <span className="text-xs text-slate-500">{donor.badge}</span>
                </div>
              </div>
              <div className="text-right">
                 <div className="font-bold text-white">${donor.amount.toLocaleString()}</div>
                 <div className="text-xs text-slate-500">Donated</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Sub-component for the Podium Column
function PodiumCard({ donor, delay, height, color, icon, isFirst = false }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={`relative flex flex-col items-center justify-end w-full md:w-44 ${height} rounded-t-3xl border-t border-x ${color} backdrop-blur-md pb-6`}
    >
      {/* Avatar floating above */}
      <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border-4 ${isFirst ? 'border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.5)]' : 'border-slate-700'} overflow-hidden`}>
        <img src={donor.avatar} alt={donor.name} className="w-full h-full object-cover" />
      </div>

      {/* Rank Icon */}
      <div className="mb-3">
        {icon}
      </div>

      <h3 className={`font-bold text-lg ${isFirst ? 'text-amber-300' : 'text-white'}`}>{donor.name}</h3>
      <p className="text-slate-400 text-sm mb-2">{donor.badge}</p>
      
      <div className={`px-4 py-1 rounded-full text-sm font-bold ${isFirst ? 'bg-amber-500 text-black' : 'bg-slate-800 text-white'}`}>
        ${donor.amount.toLocaleString()}
      </div>

      {/* Glow Effect for #1 */}
      {isFirst && <div className="absolute inset-0 bg-amber-500/10 blur-xl -z-10" />}
    </motion.div>
  );
}
