import Link from 'next/link';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div className="mb-8 font-display font-black text-9xl text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-600 opacity-20 select-none">
          404
        </div>
        
        <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white mb-4">
          Lost in the void?
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          The page you are looking for has been moved, deleted, or possibly never existed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="px-8 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg">
            <ArrowLeft className="w-4 h-4" /> Back Home
          </Link>
          <Link href="/wishes" className="px-8 py-4 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
            <Search className="w-4 h-4" /> Browse Wishes
          </Link>
        </div>
      </div>
    </div>
  );
}
