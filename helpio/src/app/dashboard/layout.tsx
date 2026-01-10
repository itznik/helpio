'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Heart, 
  History, 
  Settings, 
  LogOut, 
  Sparkles, 
  ShieldCheck, 
  Menu, 
  X 
} from 'lucide-react';

const MENU_ITEMS = [
  { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
  { icon: Heart, label: 'My Wishes', href: '/dashboard/wishes' },
  { icon: History, label: 'Donation History', href: '/dashboard/history' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex">
      
      {/* BACKGROUND VISUALS (Subtle & Persistent) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.03] dark:opacity-[0.05]" />
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-teal-500/5 dark:bg-teal-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      {/* === SIDEBAR (Desktop) === */}
      <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl z-40">
        
        {/* Logo Area */}
        <div className="p-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-tr from-teal-400 to-indigo-500 rounded-lg flex items-center justify-center text-white shadow-md group-hover:rotate-12 transition-transform">
              <Sparkles className="w-5 h-5 fill-white" />
            </div>
            <span className="text-xl font-display font-bold text-slate-900 dark:text-white">
              helpio<span className="text-teal-500">.</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}>
                  <item.icon className={`w-5 h-5 ${isActive ? 'text-teal-400 dark:text-indigo-600' : 'group-hover:scale-110 transition-transform'}`} />
                  <span className="font-bold text-sm">{item.label}</span>
                  {isActive && (
                    <motion.div layoutId="sidebar-active" className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400 dark:bg-indigo-600" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Security Badge & Logout */}
        <div className="p-4 mt-auto">
          <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 rounded-xl p-4 mb-4 flex items-center gap-3">
             <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
             <div>
                <p className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">Secure Session</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-500 font-medium">End-to-End Encrypted</p>
             </div>
          </div>
          
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors font-bold text-sm">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>


      {/* === MOBILE HEADER === */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 flex items-center justify-between px-4">
        <Link href="/" className="font-display font-bold text-xl text-slate-900 dark:text-white">helpio.</Link>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-slate-600 dark:text-slate-300">
          {isMobileOpen ? <X /> : <Menu />}
        </button>
      </div>


      {/* === MAIN CONTENT === */}
      <main className="flex-1 relative z-10 pt-20 lg:pt-0 p-4 lg:p-8 overflow-y-auto h-screen scrollbar-hide">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
      
    </div>
  );
}
