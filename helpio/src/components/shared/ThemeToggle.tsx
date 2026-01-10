"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-[84px] h-[36px] rounded-full bg-slate-100 dark:bg-slate-800" />;
  }

  return (
    <div className="flex items-center p-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'light' 
            ? 'bg-amber-100 text-amber-600 shadow-sm' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
        }`}
        aria-label="Light Mode"
      >
        <Sun className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'system' 
            ? 'bg-blue-100 text-blue-600 shadow-sm' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
        }`}
        aria-label="System Mode"
      >
        <Monitor className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-all ${
          theme === 'dark' 
            ? 'bg-indigo-100 text-indigo-600 shadow-sm' 
            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
        }`}
        aria-label="Dark Mode"
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  );
}
