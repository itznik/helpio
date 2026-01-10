'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Package, Clock, ArrowUpRight, CheckCircle2 } from 'lucide-react';

// Mock User Data
const USER = {
  name: "Nikunj",
  level: "Guardian",
  impactScore: 850,
};

// Mock Activities
const ACTIVITIES = [
  { id: 1, type: "donation", title: "You donated $50 to Sarah", time: "2 hours ago", status: "completed", amount: "$50.00" },
  { id: 2, type: "order", title: "Laptop for Aarav shipped", time: "1 day ago", status: "shipping", trackId: "#TRK-8821" },
  { id: 3, type: "system", title: "Verification badge earned", time: "3 days ago", status: "success", badge: "Verified Donor" },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. WELCOME HEADER */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-end gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-2">
            Welcome back, {USER.name} 👋
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Here is what's happening with your impact today.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">System Operational</span>
        </div>
      </motion.div>


      {/* 2. IMPACT STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Impact" 
          value="$1,240" 
          trend="+12% this month" 
          icon={TrendingUp} 
          color="indigo"
          delay={0.1}
        />
        <StatCard 
          title="Wishes Granted" 
          value="8" 
          trend="2 pending delivery" 
          icon={Package} 
          color="teal"
          delay={0.2}
        />
        <StatCard 
          title="Impact Score" 
          value={USER.impactScore} 
          trend="Top 5% of donors" 
          icon={ArrowUpRight} 
          color="purple"
          delay={0.3}
        />
      </div>


      {/* 3. SPLIT SECTION: ACTIVITY & LIVE TRACKER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: Recent Activity Feed */}
        <motion.div 
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.4 }}
           className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm p-8"
        >
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Activity</h3>
            <button className="text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline">View All</button>
          </div>

          <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
            {ACTIVITIES.map((item, index) => (
              <div key={item.id} className="relative pl-12">
                {/* Timeline Dot */}
                <div className={`absolute left-0 top-1 w-8 h-8 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center ${
                  item.status === 'success' || item.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {item.status === 'shipping' ? <Package className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                </div>

                {/* Content */}
                <div className="flex justify-between items-start group">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                      <Clock className="w-3 h-3" /> {item.time}
                    </p>
                  </div>
                  {item.amount && (
                    <span className="font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg">
                      {item.amount}
                    </span>
                  )}
                  {item.trackId && (
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-lg">
                      {item.trackId}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>


        {/* RIGHT: Profile Card (Glassmorphism) */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.5 }}
           className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 rounded-[2rem] p-8 text-white dark:text-slate-900 shadow-xl relative overflow-hidden flex flex-col items-center text-center"
        >
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500 blur-[60px] opacity-30" />
          
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-teal-400 to-indigo-500">
               <img src="https://i.pravatar.cc/150?u=nikunj" alt="Profile" className="w-full h-full rounded-full object-cover border-4 border-slate-900 dark:border-white" />
            </div>
            <div className="absolute bottom-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-slate-900">
              verified
            </div>
          </div>
          
          <h3 className="text-2xl font-display font-bold mb-1">{USER.name}</h3>
          <p className="text-sm opacity-70 mb-6">{USER.level} Level Donor</p>
          
          <div className="w-full bg-white/10 dark:bg-black/5 rounded-2xl p-4 mb-6 backdrop-blur-md">
             <div className="flex justify-between text-sm font-bold mb-2">
                <span>Next Level</span>
                <span>85%</span>
             </div>
             <div className="w-full h-2 bg-black/20 dark:bg-black/10 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-teal-400 dark:bg-teal-600 rounded-full" />
             </div>
          </div>

          <button className="w-full py-3 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold hover:scale-[1.02] transition-transform">
            Edit Profile
          </button>
        </motion.div>

      </div>

    </div>
  );
}

function StatCard({ title, value, trend, icon: Icon, color, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-2xl bg-${color}-50 dark:bg-${color}-900/20 flex items-center justify-center text-${color}-600 dark:text-${color}-400 group-hover:scale-110 transition-transform`}>
           <Icon className="w-6 h-6" />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400`}>
          Live
        </span>
      </div>
      <div className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-1">
        {value}
      </div>
      <div className="text-sm text-slate-500 font-medium">
        {trend}
      </div>
    </motion.div>
  );
}
