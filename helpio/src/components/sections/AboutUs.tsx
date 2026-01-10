'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Users } from 'lucide-react';

export default function AboutUs() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Text Content */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
              About Helpio
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-6 leading-tight">
              Bridging the gap between <br />
              <span className="text-indigo-600 dark:text-indigo-400">empathy and action.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              We started Helpio with a radical idea: What if we removed the middlemen from charity? 
              What if you could see exactly where your money goes?
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">100% Verified Needs</h4>
                  <p className="text-slate-600 dark:text-slate-400">Every wish is vetted by our team and community partners to ensure authenticity.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg">Community Driven</h4>
                  <p className="text-slate-600 dark:text-slate-400">We build local networks of trust, connecting neighbors who want to help.</p>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400 hover:gap-3 transition-all">
              Read our full manifesto <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Visual Grid (Placeholders) */}
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="col-span-2 h-64 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800"
              >
                <img 
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000" 
                  alt="Community Impact" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="h-48 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800"
              >
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=500" 
                  alt="Volunteer" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="h-48 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 bg-indigo-600 flex items-center justify-center p-6 text-center"
              >
                <div>
                  <span className="block text-4xl font-bold text-white mb-1">12K+</span>
                  <span className="text-indigo-100 text-sm">Lives Changed</span>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
