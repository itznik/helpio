'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '@/components/layout/PageHeader';
import { Search, Filter, ArrowRight, ShieldCheck, Heart, MapPin, SlidersHorizontal } from 'lucide-react';

// Mock Data
const ALL_WISHES = [
  { id: 1, user: "Aarav P.", avatar: "https://i.pravatar.cc/150?u=12", category: "Education", location: "Mumbai", title: "Laptop for Coding Bootcamp", desc: "I have been learning Python on my phone for 6 months. I need a laptop to compile code efficiently.", raised: 450, goal: 600, img: "https://images.unsplash.com/photo-1531297461136-82048dfa0ab5?auto=format&fit=crop&q=80&w=800" },
  { id: 2, user: "Sarah M.", avatar: "https://i.pravatar.cc/150?u=23", category: "Health", location: "Delhi", title: "Wheelchair Repair Kit", desc: "My wheelchair's left wheel is damaged. I just need the parts to fix it myself.", raised: 120, goal: 300, img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800" },
  { id: 3, user: "Davide B.", avatar: "https://i.pravatar.cc/150?u=34", category: "Career", location: "Bangalore", title: "Art Supplies for Portfolio", desc: "I am a digital artist trying to get commissions. My drawing tablet broke last week.", raised: 85, goal: 200, img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800" },
  { id: 4, user: "Elena R.", avatar: "https://i.pravatar.cc/150?u=45", category: "Emergency", location: "Surat", title: "Grocery Support for Month", desc: "Single mother of two, struggling to make ends meet this month due to medical bills.", raised: 100, goal: 150, img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" },
  { id: 5, user: "Marcus J.", avatar: "https://i.pravatar.cc/150?u=56", category: "Education", location: "Pune", title: "Textbooks for Semester", desc: "Medical student books are expensive. I need 3 core textbooks to pass my exams.", raised: 40, goal: 180, img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800" },
  { id: 6, user: "Priya K.", avatar: "https://i.pravatar.cc/150?u=67", category: "Business", location: "Jaipur", title: "Sewing Machine Repair", desc: "I run a tailoring business from home. My machine motor burned out.", raised: 200, goal: 250, img: "https://images.unsplash.com/photo-1605518216938-7f31b8af7880?auto=format&fit=crop&q=80&w=800" },
];

const CATEGORIES = ["All", "Education", "Health", "Career", "Emergency", "Business"];

export default function WishCatalogue() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Logic
  const filteredWishes = ALL_WISHES.filter(wish => {
    const matchesCategory = activeCategory === "All" || wish.category === activeCategory;
    const matchesSearch = wish.title.toLowerCase().includes(searchQuery.toLowerCase()) || wish.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] pb-32">
      <PageHeader 
        title="Explore Wishes" 
        subtitle="Find a story that resonates with you and make an instant difference."
        badge="Catalogue"
      />

      <div className="container mx-auto px-6 relative z-10 -mt-12">
        
        {/* === FILTER BAR (Floating) === */}
        <div className="sticky top-24 z-30 mb-12">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/50 dark:border-slate-700 shadow-xl rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search for laptops, medical help..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-950 border-none focus:ring-2 focus:ring-teal-500 dark:text-white transition-all outline-none"
              />
            </div>

            {/* Category Pills */}
            <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105' 
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Filter Button (Visual only for now) */}
            <button className="hidden md:flex p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
               <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* === WISH GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredWishes.map((wish, index) => (
              <WishCard key={wish.id} wish={wish} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {filteredWishes.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No wishes found</h3>
            <p className="text-slate-500">Try adjusting your search or category filter.</p>
          </div>
        )}

      </div>
    </main>
  );
}

function WishCard({ wish, index }: any) {
  const percentage = Math.min((wish.raised / wish.goal) * 100, 100);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col overflow-hidden"
    >
      {/* Image Header */}
      <div className="relative h-48 overflow-hidden">
        <img src={wish.img} alt={wish.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider">
            {wish.category}
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          <MapPin className="w-4 h-4 text-teal-400" />
          <span className="text-xs font-bold">{wish.location}</span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-4">
          <img src={wish.avatar} className="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-700" />
          <div>
            <div className="flex items-center gap-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{wish.user}</h4>
              <ShieldCheck className="w-3 h-3 text-teal-500" />
            </div>
            <p className="text-[10px] text-slate-400">Verified Recipient</p>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 leading-tight">
          {wish.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {wish.desc}
        </p>

        {/* Progress */}
        <div className="mt-auto">
          <div className="flex justify-between text-xs font-bold mb-2">
             <span className="text-teal-600 dark:text-teal-400">${wish.raised} raised</span>
             <span className="text-slate-400">of ${wish.goal}</span>
          </div>
          <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-6">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${percentage}%` }}
              className="h-full bg-gradient-to-r from-teal-400 to-indigo-500 rounded-full" 
            />
          </div>

          {/* Action */}
          <Link href={`/payment/${wish.id}`} className="block w-full">
            <button className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
              Grant this Wish <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
