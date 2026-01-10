"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center p-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5">
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-white shadow-sm text-amber-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 rounded-full transition-all ${theme === 'system' ? 'bg-white dark:bg-slate-700 shadow-sm text-teal-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
      >
        <Monitor className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-slate-700 shadow-sm text-indigo-400' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'}`}
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  );
}
