'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface CreateWishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = ["Education", "Health", "Food", "Tools", "Tech", "Other"];

export default function CreateWishModal({ isOpen, onClose }: CreateWishModalProps) {
  const [category, setCategory] = useState("Education");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      alert("Wish submitted for verification!");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. The Dark Backdrop (Blur) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-[60]"
          />

          {/* 2. The Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg z-[70] p-4"
          >
            <div className="bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden relative">
              
              {/* Header */}
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div>
                  <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-teal-400" />
                    Make a Wish
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">Tell us what you need. Be honest.</p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                
                {/* Wish Title */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">I need...</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Textbooks for Semester 1" 
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                    required
                  />
                </div>

                {/* Categories (Chips) */}
                <div>
                   <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Category</label>
                   <div className="flex flex-wrap gap-2">
                     {CATEGORIES.map((cat) => (
                       <button
                         key={cat}
                         type="button"
                         onClick={() => setCategory(cat)}
                         className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                           category === cat 
                             ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25' 
                             : 'bg-white/5 text-slate-400 hover:bg-white/10'
                         }`}
                       >
                         {cat}
                       </button>
                     ))}
                   </div>
                </div>

                {/* Amount */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Cost Estimate ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      className="w-full bg-slate-950 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* The Story */}
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Your Story</label>
                  <textarea 
                    rows={4}
                    placeholder="Why is this important to you? Donors love transparency."
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all resize-none"
                    required
                  ></textarea>
                </div>

                {/* Verification Notice */}
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  <p className="text-xs text-amber-200/80 leading-relaxed">
                    To prevent scams, our AI will analyze your request. You may be asked to upload ID for amounts over $100.
                  </p>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold text-lg shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transform active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Post My Wish"}
                </button>

              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
