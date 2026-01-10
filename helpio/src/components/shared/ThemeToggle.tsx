"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for client load
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render a placeholder of the exact same size to prevent layout shift
    return <div className="w-[88px] h-[36px] rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />;
  }

  return (
    <div className="flex items-center p-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-inner">
      
      {/* LIGHT BUTTON */}
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-all duration-200 ${
          theme === 'light' 
            ? 'bg-white text-amber-500 shadow-sm ring-1 ring-slate-200' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
        }`}
        aria-label="Light Mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      
      {/* SYSTEM BUTTON */}
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-full transition-all duration-200 ${
          theme === 'system' 
            ? 'bg-white dark:bg-slate-700 text-teal-600 dark:text-teal-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-600' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
        }`}
        aria-label="System Mode"
      >
        <Monitor className="w-4 h-4" />
      </button>
      
      {/* DARK BUTTON */}
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-all duration-200 ${
          theme === 'dark' 
            ? 'bg-slate-700 text-indigo-400 shadow-sm ring-1 ring-slate-600' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
        }`}
        aria-label="Dark Mode"
      >
        <Moon className="w-4 h-4" />
      </button>

    </div>
  );
}
