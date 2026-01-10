'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, Flag, ShieldCheck, MapPin, Calendar, 
  MessageCircle, Heart, CheckCircle2, AlertCircle, Eye 
} from 'lucide-react';
import Link from 'next/link';

// Mock Data (Simulating DB Fetch)
const WISH = {
  id: "1",
  title: "Laptop for Coding Bootcamp",
  user: {
    name: "Aarav Patel",
    avatar: "https://i.pravatar.cc/150?u=12",
    location: "Mumbai, India",
    verified: true,
    joined: "Aug 2024"
  },
  category: "Education",
  raised: 450,
  goal: 600,
  description: "I have been learning Python on my phone for 6 months. I recently got accepted into a remote coding bootcamp, but I need a laptop to compile code efficiently. This laptop will allow me to complete the course and apply for Junior Dev jobs.",
  coverImage: "https://images.unsplash.com/photo-1531297461136-82048dfa0ab5?auto=format&fit=crop&q=80&w=1200",
  images: [
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=400"
  ],
  updates: [
    { date: "2 days ago", title: "Acceptance Letter Received!", type: "milestone" },
    { date: "1 week ago", title: "Wish Created", type: "system" }
  ]
};

export default function WishDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'story' | 'updates'>('story');
  const percentage = Math.min((WISH.raised / WISH.goal) * 100, 100);

  return (
    <main className="min-h-screen bg-white dark:bg-[#020617] pb-32">
      
      {/* === 1. CINEMATIC HERO === */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/30 z-10" />
        <img src={WISH.coverImage} className="w-full h-full object-cover fixed top-0 left-0 w-full h-[60vh] -z-10" alt="Cover" />
        
        {/* Floating Back Button */}
        <div className="absolute top-24 left-6 z-20">
           <Link href="/wishes" className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-sm hover:bg-white/30 transition-colors">
             &larr; Back to Catalogue
           </Link>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full z-20 container mx-auto px-6 pb-12">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="max-w-4xl"
           >
              <div className="flex items-center gap-3 mb-4">
                 <span className="px-3 py-1 rounded-full bg-teal-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    {WISH.category}
                 </span>
                 <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                    <MapPin className="w-3 h-3" /> {WISH.user.location}
                 </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight drop-shadow-lg">
                 {WISH.title}
              </h1>
           </motion.div>
        </div>
      </div>


      {/* === 2. MAIN CONTENT GRID === */}
      <div className="container mx-auto px-6 -mt-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: Story & Updates */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* User Bio Card */}
             <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <img src={WISH.user.avatar} className="w-16 h-16 rounded-full border-4 border-slate-50 dark:border-slate-800" />
                <div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {WISH.user.name} <ShieldCheck className="w-5 h-5 text-teal-500" />
                   </h3>
                   <p className="text-slate-500 text-sm">Member since {WISH.user.joined}</p>
                </div>
                <div className="ml-auto">
                   <button className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                      View Profile
                   </button>
                </div>
             </div>

             {/* Navigation Tabs */}
             <div className="flex gap-8 border-b border-slate-200 dark:border-slate-800">
                {['story', 'updates'].map((tab) => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab as any)}
                     className={`pb-4 text-lg font-bold capitalize transition-colors relative ${
                        activeTab === tab ? 'text-slate-900 dark:text-white' : 'text-slate-400'
                     }`}
                   >
                      {tab}
                      {activeTab === tab && (
                         <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-1 bg-teal-500 rounded-t-full" />
                      )}
                   </button>
                ))}
             </div>

             {/* Tab Content */}
             <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                   {activeTab === 'story' ? (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="prose prose-lg dark:prose-invert max-w-none text-slate-600 dark:text-slate-300"
                      >
                         <p className="leading-relaxed whitespace-pre-line">{WISH.description}</p>
                         
                         {/* Gallery */}
                         <div className="grid grid-cols-2 gap-4 mt-8 not-prose">
                            {WISH.images.map((img, i) => (
                               <img key={i} src={img} className="rounded-2xl w-full h-48 object-cover hover:scale-[1.02] transition-transform cursor-zoom-in" />
                            ))}
                         </div>
                      </motion.div>
                   ) : (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8 border-l-2 border-slate-100 dark:border-slate-800 ml-4 pl-8 relative"
                      >
                         {WISH.updates.map((update, i) => (
                            <div key={i} className="relative">
                               <div className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-950 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                               </div>
                               <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{update.date}</span>
                               <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">{update.title}</h4>
                            </div>
                         ))}
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </div>


          {/* RIGHT COLUMN: Sticky Donation Card */}
          <div className="lg:col-span-1 relative">
             <div className="sticky top-28 space-y-6">
                
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800">
                   <div className="mb-6">
                      <div className="flex justify-between items-end mb-2">
                         <span className="text-4xl font-display font-black text-slate-900 dark:text-white">${WISH.raised}</span>
                         <span className="text-lg font-bold text-slate-500 mb-1">of ${WISH.goal} goal</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                         <div style={{ width: `${percentage}%` }} className="h-full bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full" />
                      </div>
                      <p className="text-sm text-slate-500 mt-2 font-medium">{15} people have donated</p>
                   </div>

                   <div className="space-y-3">
                      <Link href={`/payment/${WISH.id}`}>
                        <button className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-lg hover:scale-[1.02] transition-transform shadow-lg">
                           Donate Now
                        </button>
                      </Link>
                      <button className="w-full py-4 rounded-xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-2">
                         <Share2 className="w-4 h-4" /> Share
                      </button>
                   </div>

                   <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-3 mb-2">
                         <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                         <span className="font-bold text-slate-900 dark:text-white text-sm">Verified & Secure</span>
                      </div>
                      <p className="text-xs text-slate-500">
                         Helpio guarantees that funds are used for the stated purpose. <a href="#" className="underline">Learn more.</a>
                      </p>
                   </div>
                </div>

                <div className="flex justify-center">
                   <button className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                      <Flag className="w-3 h-3" /> Report this wish
                   </button>
                </div>

             </div>
          </div>

        </div>
      </div>
    </main>
  );
}
