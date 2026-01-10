'use client';

import { useState } from 'react'; // Import useState
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import WishFeed from '@/components/sections/WishFeed';
import CreateWishModal from '@/components/features/CreateWishModal'; // Import the Modal

export default function Home() {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col pt-20">
      
      {/* Background Glows (Same as before) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-500/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

      {/* Hero Content */}
      <div className="container mx-auto px-6 text-center z-10 py-20">
        
        {/* ... Badge, H1, P (Keep same) ... */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-xs font-medium text-teal-300 mb-8"
        >
          <Heart className="w-3 h-3 fill-current" />
          <span>Rewriting the rules of giving</span>
        </motion.div>

        <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
          Where Wealth Meets <br />
          <span className="text-gradient">Pure Purpose.</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Helpio is the bridge between those who have too much and those who need a hand. 
          Request a wish, or become a legend by fulfilling one.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          
          {/* UPDATED BUTTON: Opens Modal */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
          >
            Make a Wish
          </button>
          
          <button className="px-8 py-4 rounded-full glass-panel text-white font-semibold text-lg hover:bg-white/10 transition-colors flex items-center gap-2">
            Become a Donor <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Wish Feed */}
      <WishFeed />

      {/* MODAL COMPONENT */}
      <CreateWishModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

    </main>
  );
}
