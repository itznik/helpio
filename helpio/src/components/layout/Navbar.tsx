'use client';

import Link from 'next/link';
import { motion } from 'framer-motion'; // For smooth entrance
import { Menu, Sparkles } from 'lucide-react'; // Icons
import ThemeToggle from '../shared/ThemeToggle';


export default function Navbar() {
  return (
    <motion.nav 
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="fixed top-0 inset-x-0 z-50 mx-auto max-w-5xl mt-4 px-6 py-3 rounded-full border border-slate-200/50 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-sm flex justify-between items-center"
>
      {/* Logo Area */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="bg-teal-500/20 p-2 rounded-lg group-hover:bg-teal-500/40 transition-colors">
          <Sparkles className="w-6 h-6 text-teal-400" />
        </div>
        <span className="font-display font-bold text-2xl tracking-tight text-white">
          helpio<span className="text-teal-400">.</span>
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 font-medium text-sm text-gray-300">
        <Link href="#" className="hover:text-white transition-colors">How it Works</Link>
        <Link href="#" className="hover:text-white transition-colors">Leaderboard</Link>
        <Link href="#" className="hover:text-white transition-colors">Stories</Link>
      </div>

      {/* CTA Button */}
      <div className="flex items-center gap-4">
        
        {/* ADD THIS LINE */}
        <div className="hidden md:block">
           <ThemeToggle />
        </div>

        <button className="hidden md:block px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold text-sm shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-all transform hover:scale-105">
          Start Granting
        </button>
        
        {/* Mobile Menu Icon */}
        <button className="md:hidden text-gray-300">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}
