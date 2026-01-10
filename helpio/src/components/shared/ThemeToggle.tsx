"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-[88px] h-[36px] rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />;
  }

  return (
    <div className="flex items-center p-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
      
      {/* Sun Button -> Forces Light Mode */}
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'light' 
            ? 'bg-white text-amber-500 shadow-sm' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
        }`}
      >
        <Sun className="w-4 h-4" />
      </button>
      
      {/* Monitor Button -> Follows System */}
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'system' 
            ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
        }`}
      >
        <Monitor className="w-4 h-4" />
      </button>
      
      {/* Moon Button -> Forces Dark Mode */}
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'dark' 
            ? 'bg-slate-700 text-indigo-400 shadow-sm' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
        }`}
      >
        <Moon className="w-4 h-4" />
      </button>

    </div>
  );
}
