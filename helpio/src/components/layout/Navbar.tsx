'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, LogIn, UserPlus, Sparkles, 
  User as UserIcon, LayoutDashboard, LogOut, 
  ChevronRight, Home, Heart, BookOpen, Trophy
} from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation'; // Added usePathname
import { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // To close menu on navigation

  // 1. Scroll Detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Auth State Listener
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (_event === 'SIGNED_IN' || _event === 'SIGNED_OUT') {
        setIsProfileOpen(false);
        setIsMobileOpen(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 3. Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsProfileOpen(false);
    setIsMobileOpen(false);
    router.push('/');
    router.refresh();
  };

  const NAV_LINKS = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Browse Wishes', href: '/wishes', icon: SearchIcon }, // Helper below
    { name: 'Leaderboard', href: '/#leaderboard', icon: Trophy },
    { name: 'Stories', href: '/stories', icon: BookOpen },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileOpen
            ? 'py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 dark:border-slate-800/50' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2 group z-50 relative">
            <div className="w-10 h-10 bg-gradient-to-tr from-teal-400 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Sparkles className="w-6 h-6 fill-white" />
            </div>
            <span className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              helpio<span className="text-teal-500">.</span>
            </span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* DESKTOP ACTIONS */}
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
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link href="/signup" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-bold hover:scale-105 hover:shadow-lg transition-all">
                  <UserPlus className="w-4 h-4" /> Sign Up
                </Link>
              </>
            )}
          </div>

          {/* MOBILE TOGGLE BUTTON */}
          <div className="flex items-center gap-4 md:hidden z-50">
             <ThemeToggle />
             <button 
               onClick={() => setIsMobileOpen(!isMobileOpen)} 
               className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
             >
               {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
             </button>
          </div>

        </div>

        {/* === MOBILE MENU OVERLAY === */}
        <AnimatePresence>
          {isMobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: '100vh' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="fixed inset-0 top-0 bg-white dark:bg-[#020617] z-40 md:hidden pt-24 px-6 overflow-y-auto"
            >
              <div className="flex flex-col gap-2">
                
                {/* Mobile Links */}
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={link.href}
                      className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 group transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 group-hover:text-teal-600 transition-colors">
                           <link.icon className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">{link.name}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-teal-500" />
                    </Link>
                  </motion.div>
                ))}

                <div className="h-px bg-slate-100 dark:bg-slate-800 my-4" />

                {/* Mobile Auth Actions */}
                {user ? (
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }}
                     className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800"
                   >
                      <div className="flex items-center gap-4 mb-6">
                         <img src={user.user_metadata.avatar_url} className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-950" />
                         <div>
                            <p className="font-bold text-slate-900 dark:text-white">{user.user_metadata.full_name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                         </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <Link href="/dashboard" className="py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center font-bold text-sm">
                            Dashboard
                         </Link>
                         <button onClick={handleLogout} className="py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 text-center font-bold text-sm">
                            Sign Out
                         </button>
                      </div>
                   </motion.div>
                ) : (
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
                      <Link href="/login" className="w-full py-4 rounded-xl border border-slate-200 dark:border-slate-800 font-bold text-center text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900">
                         Log In
                      </Link>
                      <Link href="/signup" className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-center">
                         Create Account
                      </Link>
                   </motion.div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

// Icon Helper
function SearchIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
