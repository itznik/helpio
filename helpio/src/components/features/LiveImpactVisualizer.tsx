'use client';

import { motion } from 'framer-motion';
import { User, MapPin, Heart, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LiveImpactVisualizer() {
  const [activeUsers, setActiveUsers] = useState(1240);

  // Simulate "Live" user count fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + (Math.random() > 0.5 ? Math.floor(Math.random() * 3) : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[600px] bg-[#020617] overflow-hidden flex flex-col items-center justify-center text-white p-12">
      
      {/* 1. Dynamic Background Grid & Gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-teal-500/10 via-indigo-500/5 to-transparent blur-[100px]" />

      {/* 2. Floating "Activity" Orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-teal-400/20 blur-2xl"
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0, 0.4, 0], 
            scale: [0.5, 1.2, 0.5],
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200
          }}
          transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: i * 1 }}
          style={{ width: 150, height: 150 }}
        />
      ))}

      {/* 3. The Content Layer */}
      <div className="relative z-10 w-full max-w-lg space-y-8">
        
        {/* Live Badge */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 backdrop-blur-xl shadow-xl w-fit"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-bold text-slate-200">
            <span className="tabular-nums">{activeUsers.toLocaleString()}</span> Givers Online
          </span>
        </motion.div>

        {/* Hero Text */}
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl font-display font-bold leading-[1.1] tracking-tight">
            Join the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-400 animate-gradient">
              Global Impact
            </span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed max-w-md">
            Helpio connects your good intentions with verified needs instantly. 
            0% Fees. 100% Transparency.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-slate-800/50">
           <div className="p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <Globe className="w-5 h-5 text-indigo-400 mb-2" />
              <div className="text-2xl font-bold font-display">142</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Countries</div>
           </div>
           <div className="p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <Heart className="w-5 h-5 text-rose-400 mb-2" />
              <div className="text-2xl font-bold font-display">$2.4M</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Raised</div>
           </div>
           <div className="p-4 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-sm">
              <User className="w-5 h-5 text-teal-400 mb-2" />
              <div className="text-2xl font-bold font-display">25k+</div>
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Members</div>
           </div>
        </div>

      </div>
    </div>
  );
}
