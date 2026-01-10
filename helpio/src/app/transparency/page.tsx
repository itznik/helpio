'use client';

import PageHeader from '@/components/layout/PageHeader';
import { motion } from 'framer-motion';
import { PieChart, ArrowRight, Download } from 'lucide-react';

export default function TransparencyPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617]">
      <PageHeader 
        title="Radical Transparency" 
        subtitle="We track every cent. We have nothing to hide."
        badge="2025 Report"
      />

      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-5xl">
          
          {/* Big Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <StatCard label="Total Volume" value="$2.4M" desc="Processed securely via Stripe" />
            <StatCard label="Platform Fees" value="0%" desc="We take zero commission" />
            <StatCard label="Direct Impact" value="100%" desc="Goes to the recipient" />
          </div>

          {/* visual breakdown */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-200 dark:border-slate-800 shadow-xl mb-12">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
              <PieChart className="w-6 h-6 text-teal-500" /> Where the money goes
            </h3>
            
            {/* Custom CSS Bar Chart */}
            <div className="space-y-8">
              <BarItem label="Recipient receives" amount="97.1%" color="bg-teal-500" width="97.1%" />
              <BarItem label="Payment Processing (Stripe)" amount="2.9%" color="bg-slate-300 dark:bg-slate-700" width="2.9%" />
              <BarItem label="Helpio Platform Fee" amount="0.0%" color="bg-indigo-500" width="0.5%" />
            </div>

            <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                *Standard credit card processing fees are charged by payment providers, not us.
              </p>
            </div>
          </div>

          {/* Download */}
          <div className="flex justify-center">
             <button className="flex items-center gap-2 px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 transition-transform">
               <Download className="w-5 h-5" /> Download Full PDF Report
             </button>
          </div>

        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value, desc }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm text-center">
      <div className="text-5xl font-display font-black text-slate-900 dark:text-white mb-2">{value}</div>
      <div className="font-bold text-teal-600 dark:text-teal-400 mb-2">{label}</div>
      <div className="text-sm text-slate-500 dark:text-slate-400">{desc}</div>
    </div>
  );
}

function BarItem({ label, amount, color, width }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
        <span>{label}</span>
        <span>{amount}</span>
      </div>
      <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: width }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`} 
        />
      </div>
    </div>
  )
}
