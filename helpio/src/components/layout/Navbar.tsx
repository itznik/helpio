'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, UserPlus, Sparkles, User as UserIcon, LayoutDashboard, LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  // FIX: Renamed variable from isMobileMenuOpen to isMobileOpen to match usage
  const [isMobileOpen, setIsMobileOpen] = useState(false); 
  const [user, setUser] = useState<User | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auth State Listener (Real-time)
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsProfileOpen(false);
    router.push('/');
    router.refresh();
  };

  const navLinks = [
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'Browse Wishes', href: '/wishes' },
    { name: 'Leaderboard', href: '/#leaderboard' },
    { name: 'Stories', href: '/stories' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 dark:border-slate-800/50' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gradient-to-tr from-teal-400 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Sparkles className="w-6 h-6 fill-white" />
            </div>
            <span className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              helpio<span className="text-teal-500">.</span>
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* ACTIONS */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 pl-2 pr-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 p-0.5">
                      <img 
                        src={user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${user.email}&background=random`} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-900" 
                      />
                   </div>
                   <span className="text-sm font-bold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                      {user.user_metadata.full_name || user.email?.split('@')[0]}
                   </span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-2"
                    >
                       <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300">
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                       </Link>
                       <Link href="/dashboard/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300">
                          <UserIcon className="w-4 h-4" /> Profile
                       </Link>
                       <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                       <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-bold text-red-600 dark:text-red-400">
                          <LogOut className="w-4 h-4" /> Sign Out
                       </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link href="/login" className="flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link href="/signup" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:scale-105 hover:shadow-lg transition-all">
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex items-center gap-4 md:hidden">
             <ThemeToggle />
             <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-slate-600 dark:text-slate-300">
               {isMobileOpen ? <X /> : <Menu />}
             </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
