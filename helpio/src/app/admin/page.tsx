'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, FileText, DollarSign, Settings, 
  Bell, Search, Filter, Download, ExternalLink, 
  TrendingUp, ArrowUpRight, ArrowDownRight, MoreVertical,
  CheckCircle, XCircle, AlertTriangle, Shield, CreditCard, Ban
} from 'lucide-react';

// === MOCK DATA FOR "GOD MODE" ===
const REVENUE_DATA = [4000, 3000, 5000, 2780, 1890, 2390, 3490, 4200, 5100, 6200, 7800, 9500];

const LATEST_TRANSACTIONS = [
  { id: "TX-9921", user: "Aarav Patel", amount: "$50.00", type: "Donation", status: "succeeded", date: "2 mins ago" },
  { id: "TX-9920", user: "Sarah Connor", amount: "$120.00", type: "Donation", status: "succeeded", date: "15 mins ago" },
  { id: "TX-9919", user: "Marcus Jin", amount: "$1,200.00", type: "Sponsorship", status: "processing", date: "1 hour ago" },
  { id: "TX-9918", user: "Unknown", amount: "$5.00", type: "Tip", status: "failed", date: "3 hours ago" },
];

const PENDING_WISHES = [
  { id: 1, user: "Elena R.", title: "Surgery Support", amount: "$2,500", risk: "High", docs: true, score: 92 },
  { id: 2, user: "David K.", title: "School Books", amount: "$150", risk: "Low", docs: true, score: 15 },
];

const TAX_DOCUMENTS = [
  { id: "TAX-2024-Q1", name: "Q1 2025 Sales Tax Report", size: "2.4 MB", status: "Ready" },
  { id: "TAX-2024-YTD", name: "YTD Revenue Summary", size: "1.1 MB", status: "Processing" },
  { id: "INV-BULK", name: "Bulk Invoices (Jan)", size: "15 MB", status: "Ready" },
];

export default function AdminGodMode() {
  const [activeView, setActiveView] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // === RENDER HELPERS ===
  const renderView = () => {
    switch(activeView) {
      case 'overview': return <OverviewTab />;
      case 'wishes': return <WishesTab />;
      case 'finance': return <FinancialsTab />;
      case 'users': return <UsersTab />;
      default: return <OverviewTab />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-300 flex overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* 1. THE COMMAND SIDEBAR */}
      <aside className={`${isSidebarOpen ? 'w-72' : 'w-20'} bg-[#0f172a] border-r border-slate-800 flex flex-col transition-all duration-300 relative z-20`}>
        
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
           <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
             H
           </div>
           {isSidebarOpen && (
             <span className="ml-3 font-display font-bold text-white tracking-tight text-lg">
               helpio<span className="text-indigo-500">.admin</span>
             </span>
           )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
           <NavItem icon={LayoutDashboard} label="Mission Control" active={activeView === 'overview'} onClick={() => setActiveView('overview')} expanded={isSidebarOpen} />
           <NavItem icon={FileText} label="Wish Approval" badge="12" active={activeView === 'wishes'} onClick={() => setActiveView('wishes')} expanded={isSidebarOpen} />
           <NavItem icon={Users} label="User Database" active={activeView === 'users'} onClick={() => setActiveView('users')} expanded={isSidebarOpen} />
           <NavItem icon={DollarSign} label="Financials & Tax" active={activeView === 'finance'} onClick={() => setActiveView('finance')} expanded={isSidebarOpen} />
           <div className="pt-8 pb-2">
              {isSidebarOpen && <p className="px-4 text-xs font-bold text-slate-600 uppercase tracking-widest">System</p>}
           </div>
           <NavItem icon={Settings} label="Global Settings" active={activeView === 'settings'} onClick={() => setActiveView('settings')} expanded={isSidebarOpen} />
        </nav>

        {/* Admin User */}
        <div className="p-4 border-t border-slate-800">
           <div className="flex items-center gap-3">
              <img src="https://i.pravatar.cc/150?u=admin" className="w-10 h-10 rounded-full border border-slate-700" />
              {isSidebarOpen && (
                 <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">Nikunj Variya</p>
                    <p className="text-xs text-emerald-500 flex items-center gap-1">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Super Admin
                    </p>
                 </div>
              )}
           </div>
        </div>
      </aside>


      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
         
         {/* Background Grid */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

         {/* Top Header */}
         <header className="h-20 border-b border-slate-800 bg-[#0B1120]/80 backdrop-blur-xl flex items-center justify-between px-8 z-10">
            <h2 className="text-xl font-bold text-white capitalize">{activeView.replace('-', ' ')}</h2>
            
            <div className="flex items-center gap-6">
               <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input type="text" placeholder="Global Search (Cmd+K)" className="bg-slate-900 border border-slate-700 rounded-full pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-64 text-white placeholder:text-slate-600" />
               </div>
               <button className="relative p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
               </button>
            </div>
         </header>

         {/* Scrollable View Content */}
         <div className="flex-1 overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <AnimatePresence mode="wait">
               <motion.div
                 key={activeView}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.2 }}
               >
                  {renderView()}
               </motion.div>
            </AnimatePresence>
         </div>

      </main>
    </div>
  );
}

// === SUB-COMPONENTS FOR CLEANLINESS ===

function NavItem({ icon: Icon, label, active, onClick, expanded, badge }: any) {
   return (
      <button 
         onClick={onClick}
         className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
            active 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
            : 'text-slate-400 hover:bg-slate-800 hover:text-white'
         }`}
      >
         <Icon className={`w-5 h-5 ${active ? 'text-white' : 'group-hover:text-indigo-400'}`} />
         {expanded && (
            <>
               <span className="font-medium text-sm flex-1 text-left">{label}</span>
               {badge && <span className="px-2 py-0.5 rounded-md bg-white/20 text-xs font-bold">{badge}</span>}
            </>
         )}
      </button>
   )
}


// --- TAB 1: MISSION CONTROL (Analytics) ---
function OverviewTab() {
   return (
      <div className="space-y-8">
         {/* KPI Cards */}
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard label="Total Revenue" value="$248,300" trend="+12.5%" trendUp={true} icon={DollarSign} color="emerald" />
            <StatCard label="Active Users" value="12,450" trend="+3.2%" trendUp={true} icon={Users} color="blue" />
            <StatCard label="Pending Wishes" value="142" trend="-5%" trendUp={false} icon={FileText} color="amber" />
            <StatCard label="Platform Health" value="99.9%" trend="Stable" trendUp={true} icon={Shield} color="purple" />
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Chart */}
            <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden">
               <div className="flex justify-between items-center mb-8">
                  <div>
                     <h3 className="text-xl font-bold text-white">Revenue Growth</h3>
                     <p className="text-sm text-slate-500">Gross transaction volume over time</p>
                  </div>
                  <select className="bg-slate-800 border border-slate-700 text-white text-sm rounded-lg px-3 py-1 outline-none">
                     <option>This Year</option>
                     <option>Last Year</option>
                  </select>
               </div>
               
               {/* CSS-Only Chart Mockup */}
               <div className="h-64 flex items-end gap-2 px-2">
                  {REVENUE_DATA.map((val, i) => (
                     <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-lg relative group hover:bg-indigo-500/40 transition-colors" style={{ height: `${(val / 10000) * 100}%` }}>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-500 rounded-full" />
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-slate-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                           ${val}
                        </div>
                     </div>
                  ))}
               </div>
               {/* Background Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/10 blur-[100px] pointer-events-none" />
            </div>

            {/* Live Feed */}
            <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl">
               <h3 className="text-xl font-bold text-white mb-6">Live Activity</h3>
               <div className="space-y-6">
                  {LATEST_TRANSACTIONS.map((tx) => (
                     <div key={tx.id} className="flex items-center gap-4 group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                           tx.status === 'succeeded' ? 'bg-emerald-500/10 text-emerald-500' : 
                           tx.status === 'processing' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                        }`}>
                           {tx.status === 'succeeded' ? <ArrowUpRight className="w-5 h-5" /> : 
                            tx.status === 'processing' ? <CreditCard className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-bold text-white truncate">{tx.user}</p>
                           <p className="text-xs text-slate-500">{tx.type} • {tx.date}</p>
                        </div>
                        <span className={`font-mono font-bold ${tx.status === 'succeeded' ? 'text-white' : 'text-slate-500'}`}>
                           {tx.amount}
                        </span>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-6 py-3 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-bold transition-colors">
                  View Real-time Stream
               </button>
            </div>
         </div>
      </div>
   )
}


// --- TAB 2: FINANCIALS (Stripe & Tax) ---
function FinancialsTab() {
   return (
      <div className="space-y-8">
         <div className="flex justify-between items-end">
            <div>
               <h2 className="text-3xl font-bold text-white mb-2">Financial Command</h2>
               <p className="text-slate-400">Stripe Connect status, Tax Documents, and Invoicing.</p>
            </div>
            <div className="flex gap-3">
               <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm transition-colors">
                  <ExternalLink className="w-4 h-4" /> Open Stripe Dashboard
               </button>
            </div>
         </div>

         {/* Balance Cards */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 relative overflow-hidden">
               <p className="text-slate-500 font-bold uppercase text-xs tracking-wider mb-2">Available Balance</p>
               <h3 className="text-4xl font-display font-black text-white">$12,420.50</h3>
               <p className="text-emerald-500 text-sm font-bold mt-2">Ready to payout</p>
               <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500/10 blur-[50px]" />
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
               <p className="text-slate-500 font-bold uppercase text-xs tracking-wider mb-2">Pending (Rolling)</p>
               <h3 className="text-4xl font-display font-black text-slate-300">$3,205.00</h3>
               <p className="text-slate-500 text-sm font-bold mt-2">Available in 2 days</p>
            </div>
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
               <p className="text-slate-500 font-bold uppercase text-xs tracking-wider mb-2">Helpio Net Income (Tips)</p>
               <h3 className="text-4xl font-display font-black text-indigo-400">$845.00</h3>
               <p className="text-indigo-300/60 text-sm font-bold mt-2">This month</p>
            </div>
         </div>

         {/* Tax Documents */}
         <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
               <h3 className="font-bold text-white text-lg">Generated Tax Documents</h3>
               <button className="text-indigo-400 text-sm font-bold hover:underline">Generate New Report</button>
            </div>
            <table className="w-full text-left">
               <thead className="bg-slate-950 text-slate-500 text-xs uppercase font-bold">
                  <tr>
                     <th className="px-6 py-4">Document Name</th>
                     <th className="px-6 py-4">Reference ID</th>
                     <th className="px-6 py-4">Size</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-800">
                  {TAX_DOCUMENTS.map((doc) => (
                     <tr key={doc.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 font-bold text-white flex items-center gap-3">
                           <FileText className="w-4 h-4 text-slate-500" /> {doc.name}
                        </td>
                        <td className="px-6 py-4 font-mono text-sm text-slate-400">{doc.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-400">{doc.size}</td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded text-xs font-bold ${
                              doc.status === 'Ready' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                           }`}>
                              {doc.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                              <Download className="w-4 h-4" />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}


// --- TAB 3: WISH APPROVAL (Moderation) ---
function WishesTab() {
   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-white">Wish Moderation Queue</h2>
            <div className="flex gap-2">
               <button className="px-4 py-2 bg-slate-800 text-white rounded-lg font-bold text-sm">All</button>
               <button className="px-4 py-2 hover:bg-slate-800 text-slate-400 rounded-lg font-bold text-sm">High Risk</button>
            </div>
         </div>

         {/* Kanban-style List */}
         <div className="space-y-4">
            {PENDING_WISHES.map((wish) => (
               <div key={wish.id} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 flex flex-col lg:flex-row items-start lg:items-center gap-6 hover:border-slate-700 transition-colors">
                  
                  {/* Risk Indicator */}
                  <div className={`w-16 h-16 rounded-xl flex flex-col items-center justify-center font-bold text-sm ${
                     wish.risk === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                  }`}>
                     <span className="text-2xl">{wish.score}</span>
                     <span className="text-[10px] uppercase">Risk</span>
                  </div>

                  <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-bold text-white">{wish.title}</h3>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-xs text-slate-400 font-bold border border-slate-700">
                           {wish.amount}
                        </span>
                     </div>
                     <p className="text-slate-400 text-sm flex items-center gap-4">
                        <span>by <span className="text-white">{wish.user}</span></span>
                        {wish.docs && <span className="flex items-center gap-1 text-indigo-400"><FileText className="w-3 h-3" /> Docs Verified</span>}
                     </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 w-full lg:w-auto mt-4 lg:mt-0">
                     <button className="flex-1 lg:flex-none px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-sm transition-colors">
                        Review
                     </button>
                     <button className="flex-1 lg:flex-none px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Approve
                     </button>
                     <button className="p-3 bg-slate-800 hover:bg-red-900/30 text-slate-400 hover:text-red-500 rounded-xl transition-colors">
                        <Ban className="w-5 h-5" />
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}


// --- TAB 4: USER MANAGEMENT ---
function UsersTab() {
   return (
      <div className="space-y-6">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">User Database</h2>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold text-sm">Export CSV</button>
         </div>
         
         <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden">
            {/* Simple User Table Mockup */}
            <table className="w-full text-left">
               <thead className="bg-slate-950 text-slate-500 text-xs uppercase font-bold">
                  <tr>
                     <th className="px-6 py-4">User</th>
                     <th className="px-6 py-4">Role</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Total Donated</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-800">
                  {[1,2,3,4].map((i) => (
                     <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                        <td className="px-6 py-4 flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-slate-700" />
                           <span className="font-bold text-white">User {i}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-sm">Donor</td>
                        <td className="px-6 py-4"><span className="text-emerald-500 text-xs font-bold px-2 py-1 bg-emerald-500/10 rounded">Active</span></td>
                        <td className="px-6 py-4 text-white font-mono">$1,200</td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-slate-400 hover:text-white"><MoreVertical className="w-4 h-4" /></button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   )
}


// --- HELPER COMPONENT ---
function StatCard({ label, value, trend, trendUp, icon: Icon, color }: any) {
   return (
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all group">
         <div className="flex justify-between items-start mb-4">
            <div className={`w-10 h-10 rounded-lg bg-${color}-500/10 flex items-center justify-center text-${color}-500 group-hover:scale-110 transition-transform`}>
               <Icon className="w-5 h-5" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
               {trendUp ? <TrendingUp className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
               {trend}
            </div>
         </div>
         <h3 className="text-3xl font-display font-bold text-white mb-1">{value}</h3>
         <p className="text-slate-500 text-sm font-medium">{label}</p>
      </div>
   )
}
