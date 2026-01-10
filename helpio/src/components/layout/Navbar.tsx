'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, Sparkles } from 'lucide-react';
import ThemeToggle from '../shared/ThemeToggle';

export default function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 inset-x-0 z-50 mx-auto max-w-5xl mt-4 px-6 py-3 rounded-full border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm flex justify-between items-center transition-colors"
    >
      {/* Logo Area */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="bg-teal-50 dark:bg-teal-500/20 p-2 rounded-lg group-hover:bg-teal-100 dark:group-hover:bg-teal-500/40 transition-colors">
          <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
        </div>
        <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">
          helpio<span className="text-teal-600 dark:text-teal-400">.</span>
        </span>
      </Link>

      {/* Desktop Links - Explicit Slate-600 for Light Mode */}
      <div className="hidden md:flex gap-8 font-medium text-sm text-slate-600 dark:text-slate-300">
        <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">How it Works</Link>
        <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Leaderboard</Link>
        <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Stories</Link>
      </div>

      {/* CTA Button & Toggle */}
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
           <ThemeToggle />
        </div>

        {/* Button: Black in Light Mode, White in Dark Mode */}
        <button className="hidden md:block px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-lg hover:scale-105 transition-all">
          Start Granting
        </button>

        {/* Mobile Menu Icon - Black in Light Mode */}
        <button className="md:hidden text-slate-900 dark:text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </motion.nav>
  );
}
