'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, UploadCloud, Sparkles, Image as ImageIcon, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

// Steps Configuration
const STEPS = [
  { id: 1, title: " The Basics", desc: "What do you need?" },
  { id: 2, title: "Your Story", desc: "Why it matters?" },
  { id: 3, title: "Verification", desc: "Proof & Trust" },
];

export default function CreateWishPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Education',
    amount: '',
    description: '',
    files: [] as File[]
  });

  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617] flex flex-col">
      
      {/* === HEADER (Progress) === */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/dashboard" className="font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Exit Studio
          </Link>

          {/* Progress Steps */}
          <div className="hidden md:flex items-center gap-4">
            {STEPS.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                    isActive ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 scale-110 shadow-lg' : 
                    isCompleted ? 'bg-teal-500 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                  }`}>
                    {isCompleted ? <ShieldCheck className="w-4 h-4" /> : step.id}
                  </div>
                  <div className={`${isActive ? 'opacity-100' : 'opacity-40'} transition-opacity`}>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Step {step.id}</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{step.title}</p>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className="w-8 h-px bg-slate-200 dark:bg-slate-800 mx-2" />
                  )}
                </div>
              );
            })}
          </div>

          <button className="text-sm font-bold text-slate-500">
            Save Draft
          </button>
        </div>
      </header>


      {/* === MAIN FORM AREA === */}
      <div className="flex-1 container mx-auto px-6 py-12 max-w-4xl">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: BASICS */}
          {currentStep === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">Let's start with the basics.</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Be specific. Specific wishes get funded 3x faster.</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                
                {/* Title Input */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Wish Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Laptop for Computer Science Degree"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg font-bold dark:text-white"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Category Select */}
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Category</label>
                      <select 
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold dark:text-white appearance-none cursor-pointer"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        <option>Education</option>
                        <option>Health</option>
                        <option>Business</option>
                        <option>Emergency</option>
                      </select>
                   </div>

                   {/* Amount Input */}
                   <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Goal Amount ($)</label>
                      <input 
                        type="number" 
                        placeholder="500"
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold dark:text-white"
                        value={formData.amount}
                        onChange={(e) => setFormData({...formData, amount: e.target.value})}
                      />
                   </div>
                </div>

              </div>
            </motion.div>
          )}


          {/* STEP 2: STORY */}
          {currentStep === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">Tell your story.</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">Donors connect with people, not just needs.</p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                
                {/* Description Editor */}
                <div className="space-y-2 relative">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Description</label>
                    <button className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 px-2 py-1 rounded-lg transition-colors">
                      <Sparkles className="w-3 h-3" /> Polish with AI
                    </button>
                  </div>
                  <textarea 
                    className="w-full px-6 py-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[300px] resize-none dark:text-white font-medium leading-relaxed"
                    placeholder="Tell us about yourself, why you need this, and how it will change your life..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  ></textarea>
                </div>

                {/* Image Upload Zone */}
                <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-8 text-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                  <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">Upload a cover photo</h3>
                  <p className="text-sm text-slate-500">Drag & drop or click to browse (Max 5MB)</p>
                </div>

              </div>
            </motion.div>
          )}


           {/* STEP 3: VERIFICATION (Skin in the Game) */}
           {currentStep === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-display font-bold text-slate-900 dark:text-white mb-4">Final Step: Verification</h1>
                <p className="text-slate-600 dark:text-slate-400 text-lg">We prioritize safety. Verified wishes get funded 10x more.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                 
                 {/* Upload Proof */}
                 <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                       <ShieldCheck className="w-5 h-5 text-teal-500" /> Upload Documents
                    </h3>
                    <p className="text-sm text-slate-500">Upload an ID, Medical Bill, or Admission Letter. These are <strong className="text-slate-900 dark:text-white">encrypted</strong> and never shown publicly.</p>
                    
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center"><ImageIcon className="w-5 h-5 text-slate-500" /></div>
                          <div className="flex-1">
                             <div className="h-2 w-20 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
                             <div className="h-2 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                          </div>
                          <button className="text-xs font-bold text-teal-600">Upload</button>
                       </div>
                    </div>
                 </div>

                 {/* The Fee Card (Monetization) */}
                 <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 p-8 rounded-[2.5rem] shadow-2xl text-white dark:text-slate-900 relative overflow-hidden">
                    <div className="relative z-10">
                       <h3 className="text-2xl font-display font-bold mb-2">Anti-Spam Verification</h3>
                       <p className="text-sm opacity-80 mb-8">To prevent bots and maintain trust, we charge a nominal fee to list your wish.</p>
                       
                       <div className="flex items-end gap-2 mb-8">
                          <span className="text-5xl font-display font-black">$1.00</span>
                          <span className="text-lg font-bold opacity-60 mb-2">One-time</span>
                       </div>

                       <div className="space-y-3 mb-8">
                          <div className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" /> Verified Badge on Listing</div>
                          <div className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" /> Priority Support</div>
                          <div className="flex items-center gap-2 text-sm font-medium"><CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" /> 100% Refund if funded</div>
                       </div>

                       <button className="w-full py-4 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg hover:scale-[1.02] transition-transform shadow-lg">
                          Pay & Publish
                       </button>
                       <p className="text-[10px] text-center mt-4 opacity-60">Can't afford $1? <button className="underline hover:text-white dark:hover:text-black">Apply for waiver</button></p>
                    </div>
                    
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500 blur-[80px] opacity-50" />
                 </div>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>


      {/* === FOOTER ACTION BAR === */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 z-40">
        <div className="container mx-auto flex justify-between items-center max-w-4xl">
          <button 
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
          
          {currentStep < 3 && (
            <button 
              onClick={handleNext}
              className="px-8 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </main>
  );
}
