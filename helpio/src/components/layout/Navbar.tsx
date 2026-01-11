'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, LogIn, UserPlus, Sparkles, 
  User as UserIcon, LayoutDashboard, LogOut, 
  ChevronRight, Home, Heart, BookOpen, Trophy,
  Settings, Wallet, PlusCircle, History
} from 'lucide-react';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
import { supabase } from '@/lib/supabase';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check if we are in the "App" area (Dashboard, Profile, Settings)
  const isAppPage = pathname?.startsWith('/dashboard') || pathname?.startsWith('/profile') || pathname?.startsWith('/settings');

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
        // If signing out from a dashboard page, go home
        if (_event === 'SIGNED_OUT' && isAppPage) {
           router.push('/');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [isAppPage, router]);

  // 3. Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh(); // Clear server cookies
    router.push('/');
  };

  // === DYNAMIC LINKS CONFIGURATION ===
  const PUBLIC_LINKS = [
    { name: 'Browse Wishes', href: '/wishes', icon: Heart },
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
    { name: 'Stories', href: '/stories', icon: BookOpen },
  ];

  const DASHBOARD_LINKS = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Activity', href: '/dashboard/history', icon: History },
    { name: 'Make a Wish', href: '/create', icon: PlusCircle },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const CURRENT_LINKS = isAppPage ? DASHBOARD_LINKS : PUBLIC_LINKS;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileOpen || isAppPage
            ? 'py-4 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl shadow-sm border-b border-slate-200/50 dark:border-slate-800/50' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href={isAppPage ? "/dashboard" : "/"} className="flex items-center gap-2 group z-50 relative">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform ${
                isAppPage ? 'bg-indigo-600' : 'bg-gradient-to-tr from-teal-400 to-indigo-500'
            }`}>
              <Sparkles className="w-6 h-6 fill-white" />
            </div>
            <span className="text-2xl font-display font-bold text-slate-900 dark:text-white tracking-tight">
              helpio<span className={isAppPage ? "text-indigo-500" : "text-teal-500"}>.</span>
            </span>
          </Link>

          {/* DESKTOP LINKS (Dynamic) */}
          <div className="hidden md:flex items-center gap-8">
            {CURRENT_LINKS.map((link) => {
               const isActive = pathname === link.href;
               return (
                  <Link 
                    key={link.name} 
                    href={link.href}
                    className={`text-sm font-bold transition-colors flex items-center gap-2 ${
                        isActive 
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-full' 
                        : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`}
                  >
                    {isAppPage && <link.icon className="w-4 h-4" />}
                    {link.name}
                  </Link>
               );
            })}
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
                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400 p-0.5">
                      <img 
                        src={user.user_metadata.avatar_url || `https://ui-avatars.com/api/?name=${user.email}&background=random`} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-900" 
                      />
                   </div>
                   <span className="text-sm font-bold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                      {user.user_metadata.full_name || 'My Account'}
                   </span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full right-0 mt-2 w-60 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-2"
                    >
                       <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-2">
                          <p className="text-xs font-bold text-slate-500 uppercase">Signed in as</p>
                          <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.email}</p>
                       </div>

                       <Link href="/dashboard" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300">
                          <LayoutDashboard className="w-4 h-4 text-indigo-500" /> Dashboard
                       </Link>
                       <Link href="/dashboard/settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-sm font-bold text-slate-700 dark:text-slate-300">
                          <Settings className="w-4 h-4 text-slate-500" /> Settings
                       </Link>
                       
                       <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
                       
                       <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-sm font-bold text-red-600 dark:text-red-400 transition-colors">
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
                  Get Started
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
                {CURRENT_LINKS.map((link, i) => (
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
                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 group-hover:text-indigo-600 transition-colors">
                           <link.icon className="w-5 h-5" />
                        </div>
                        <span className="text-lg font-bold text-slate-900 dark:text-white">{link.name}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500" />
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
