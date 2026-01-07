"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Gift, ShieldCheck } from "lucide-react"

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-primary px-4 pt-32 pb-20 md:pt-40 md:pb-32">
      
      {/* Background Abstract Doodles (The "Playful" Vibe) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Swirl */}
        <svg className="absolute top-20 -left-10 w-64 h-64 text-white/10" viewBox="0 0 200 200">
           <path d="M10,100 C10,10 80,10 100,50 S150,150 190,100" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        {/* Bottom Right Circle */}
        <svg className="absolute bottom-10 right-0 w-96 h-96 text-secondary/20 translate-x-1/2" viewBox="0 0 200 200">
           <circle cx="100" cy="100" r="80" fill="currentColor" />
        </svg>
      </div>

      <div className="container relative mx-auto flex flex-col items-center gap-12 text-center md:flex-row md:justify-between md:text-left">
        
        {/* LEFT SIDE: Copy & Actions */}
        <div className="flex flex-col items-center md:items-start z-10 max-w-2xl">
          
          {/* "Exclusive" Pill Badge */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm font-bold text-white backdrop-blur-md border border-white/20 mb-8"
          >
            <ShieldCheck className="h-4 w-4 text-secondary" />
            <span>Trusted by 10,000+ Creators</span>
          </motion.div>

          {/* Main Headline with Serif Font */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl font-black leading-[1.1] text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Get the Gifts <br />
            You Actually <br />
            <span className="relative inline-block text-secondary">
              Need.
              {/* Scribble Underline SVG */}
              <svg className="absolute -bottom-2 left-0 w-full h-4 text-white" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 max-w-lg text-xl text-blue-100 font-medium leading-relaxed"
          >
            Helpio connects you with people who want to support your dreams. Safe, private, and direct to your doorstep.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex w-full flex-col gap-4 sm:flex-row sm:w-auto"
          >
            <button className="h-14 px-8 rounded-full bg-secondary text-secondary-foreground font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_40px_-10px_rgba(236,72,153,0.5)] flex items-center justify-center gap-2">
              Create My Wishlist
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="h-14 px-8 rounded-full bg-white/10 text-white border border-white/20 font-bold text-lg hover:bg-white/20 transition-colors flex items-center justify-center backdrop-blur-sm">
              Explore Wishes
            </button>
          </motion.div>
        </div>

        {/* RIGHT SIDE: The Visuals (Floating Cards) */}
        <div className="relative mt-8 w-full max-w-[450px] md:mt-0 perspective-1000">
            
            {/* Main Image Card */}
            <motion.div
               initial={{ rotate: 6, scale: 0.8, opacity: 0 }}
               animate={{ rotate: 3, scale: 1, opacity: 1 }}
               transition={{ delay: 0.4, type: "spring" }}
               className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] border-[6px] border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl"
            >
               {/* Replace this with a real image later */}
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white p-6">
                  <span className="font-heading text-6xl opacity-20">Image</span>
                  <p className="opacity-60 text-center mt-4 text-sm font-medium">Add a photo of a happy person holding a gift here</p>
               </div>

               {/* "Wish List" Overlay inside the card */}
               <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-3xl shadow-lg">
                  <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-full bg-gray-200" />
                     <div>
                        <div className="h-3 w-24 bg-gray-800 rounded-full mb-1" />
                        <div className="h-2 w-16 bg-gray-400 rounded-full" />
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Floating Element 1: "Wish Granted" */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [0, -15, 0] }}
              transition={{ delay: 0.6, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute -left-8 top-20 z-20 rounded-2xl bg-white p-4 shadow-xl shadow-black/20 max-w-[160px] -rotate-6"
            >
               <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                     <Gift size={18} />
                  </div>
                  <span className="text-sm font-bold text-gray-900 leading-tight">New Gift!</span>
               </div>
               <p className="text-xs text-gray-500 font-medium">Sony Vlog Camera just purchased.</p>
            </motion.div>

            {/* Floating Element 2: "100% Privacy" */}
            <motion.div 
               initial={{ x: 50, opacity: 0 }}
               animate={{ x: 0, opacity: 1, y: [0, 10, 0] }}
               transition={{ delay: 0.8, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
               className="absolute -right-4 bottom-32 z-20 flex items-center gap-3 rounded-full bg-secondary px-6 py-4 shadow-xl shadow-secondary/30 rotate-3"
            >
               <ShieldCheck className="text-secondary-foreground h-6 w-6" />
               <span className="font-heading font-bold text-secondary-foreground text-lg">Secure</span>
            </motion.div>
        </div>

      </div>
      
      {/* Curved Bottom Edge (White Wave) */}
      <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-background"></path>
        </svg>
      </div>
    </section>
  )
}
