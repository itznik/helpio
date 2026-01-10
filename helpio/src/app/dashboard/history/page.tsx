'use client';

import { motion } from 'framer-motion';
import { 
  Package, Download, ExternalLink, Search, Filter, 
  ArrowUpRight, CheckCircle2, Clock 
} from 'lucide-react';

const HISTORY = [
  { id: "ORD-9921", wish: "Laptop for Coding", recipient: "Aarav P.", amount: "$50.00", date: "Oct 24, 2025", status: "Delivered", type: "Donation" },
  { id: "ORD-9918", wish: "Medical Surgery", recipient: "Elena R.", amount: "$120.00", date: "Oct 20, 2025", status: "Verified", type: "Donation" },
  { id: "ORD-9840", wish: "School Textbooks", recipient: "Sarah K.", amount: "$30.00", date: "Sep 15, 2025", status: "Processing", type: "Order" },
];

export default function HistoryPage() {
  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">Impact History</h1>
          <p className="text-slate-600 dark:text-slate-400">Track your donations and download tax receipts.</p>
        </div>
        <div className="flex gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <Download className="w-4 h-4" /> Export CSV
           </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row gap-2">
         <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Search recipients or IDs" className="w-full pl-10 pr-4 py-2 rounded-xl bg-transparent focus:bg-slate-50 dark:focus:bg-slate-800 outline-none transition-colors dark:text-white" />
         </div>
         <div className="flex gap-2">
            <select className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border-none font-bold text-sm outline-none cursor-pointer text-slate-600 dark:text-slate-300">
               <option>All Time</option>
               <option>2025</option>
               <option>2024</option>
            </select>
            <button className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
               <Filter className="w-4 h-4" />
            </button>
         </div>
      </div>

      {/* History Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
         <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 text-xs uppercase font-bold border-b border-slate-100 dark:border-slate-800">
               <tr>
                  <th className="px-8 py-5">Transaction Details</th>
                  <th className="px-6 py-5">Recipient</th>
                  <th className="px-6 py-5">Amount</th>
                  <th className="px-6 py-5">Status</th>
                  <th className="px-6 py-5 text-right">Receipt</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
               {HISTORY.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                     <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                           <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              item.type === 'Donation' ? 'bg-teal-50 dark:bg-teal-900/20 text-teal-600' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                           }`}>
                              {item.type === 'Donation' ? <ArrowUpRight className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                           </div>
                           <div>
                              <p className="font-bold text-slate-900 dark:text-white">{item.wish}</p>
                              <p className="text-xs text-slate-500 font-mono">{item.id} • {item.date}</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-6 py-5 text-sm font-medium text-slate-600 dark:text-slate-400">
                        {item.recipient}
                     </td>
                     <td className="px-6 py-5 font-mono font-bold text-slate-900 dark:text-white">
                        {item.amount}
                     </td>
                     <td className="px-6 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                           item.status === 'Delivered' || item.status === 'Verified' 
                           ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                           : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                        }`}>
                           {item.status === 'Processing' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                           {item.status}
                        </span>
                     </td>
                     <td className="px-6 py-5 text-right">
                        <button className="text-slate-400 hover:text-indigo-600 transition-colors opacity-0 group-hover:opacity-100" title="Download Receipt">
                           <Download className="w-5 h-5" />
                        </button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

    </div>
  );
}
