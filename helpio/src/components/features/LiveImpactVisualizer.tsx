'use client';

import { motion } from 'framer-motion';
import { User, MapPin, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function LiveImpactVisualizer() {
  const [activeUsers, setActiveUsers] = useState(1240);

  // Fake "Live" counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-slate-900 overflow-hidden flex flex-col items-center justify-center text-white">
      {/* Background Map Effect */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/40 via-slate-900 to-slate-900" />
      
      {/* Floating Orbs (Simulating Global Activity) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-teal-500/30 blur-xl"
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0], 
            scale: [0.5, 1.5, 0.5],
            x: Math.random() * 400 - 200,
            y: Math.random() * 400 - 200
          }}
          transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, delay: i * 0.5 }}
          style={{ width: 100 + Math.random() * 100, height: 100 + Math.random() * 100 }}
        />
      ))}

      <div className="relative z-10 text-center space-y-6 max-w-lg p-6">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
          </span>
          <span className="text-sm font-bold text-teal-300">{activeUsers.toLocaleString()} People Online</span>
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
          Join the <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">
            Global Movement
          </span>
        </h2>
        
        <p className="text-slate-400 text-lg">
          Every second, someone's wish is being granted. Be part of the change that is reshaping philanthropy.
        </p>

        <div className="grid grid-cols-3 gap-4 pt-8">
           <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
              <User className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
              <div className="text-xl font-bold">25k+</div>
              <div className="text-xs text-slate-500">Donors</div>
           </div>
           <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
              <MapPin className="w-6 h-6 text-teal-400 mx-auto mb-2" />
              <div className="text-xl font-bold">142</div>
              <div className="text-xs text-slate-500">Countries</div>
           </div>
           <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700 backdrop-blur-sm">
              <Heart className="w-6 h-6 text-rose-400 mx-auto mb-2" />
              <div className="text-xl font-bold">$2M+</div>
              <div className="text-xs text-slate-500">Raised</div>
           </div>
        </div>
      </div>
    </div>
  );
}
