"use client"

import { motion } from "framer-motion"
import { ArrowRight, Heart, Sparkles, Gift } from "lucide-react"

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-primary px-4 pt-10 pb-20 md:pt-20 md:pb-32">
      
      {/* Background Doodles (Abstract Shapes) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="absolute top-10 left-10 w-32 h-32 text-white animate-pulse-slow" viewBox="0 0 100 100">
           <path d="M50 0 C20 0 0 20 0 50 C0 80 20 100 50 100 C80 100 100 80 100 50" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <svg className="absolute bottom-20 right-10 w-48 h-48 text-pink-300" viewBox="0 0 200 200">
           <path d="M10,10 Q50,100 90,10 T190,10" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>

      <div className="container relative mx-auto flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-left">
        
        {/* Left Content (Text) */}
        <div className="flex flex-col items-center md:items-start z-10 max-w-xl">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md border border-white/20 mb-6"
          >
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span>Join 10,000+ Wishers & Givers</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-5xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Direct Impact. <br />
            <span className="text-secondary inline-block relative">
              Zero Doubt.
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary" viewBox="0 0 100 10" preserveAspectRatio="none">
                 <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 max-w-lg text-lg text-blue-100 sm:text-xl font-body"
          >
            Helpio connects generous hearts directly with people in need. You buy the item, we deliver the hope. No cash, just impact.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:w-auto"
          >
            <button className="h-14 px-8 rounded-full bg-secondary text-secondary-foreground font-bold text-lg hover:scale-105 transition-transform shadow-xl shadow-secondary/20 flex items-center justify-center gap-2">
              Start Wishing
              <ArrowRight className="h-5 w-5" />
            </button>
            <button className="h-14 px-8 rounded-full bg-white text-primary font-bold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center">
              Grant a Wish
            </button>
          </motion.div>
        </div>

        {/* Right Content (Floating Cards Image) */}
        <div className="relative mt-12 w-full max-w-[500px] md:mt-0">
            {/* Main Character / Image */}
            <motion.div
               initial={{ scale: 0.8, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ delay: 0.4 }}
               className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-3xl border-4 border-white/20 bg-white/10 backdrop-blur-sm shadow-2xl"
            >
               {/* Placeholder for happy person image */}
               <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-bold opacity-50 text-2xl">[Happy User Image]</span>
               </div>
            </motion.div>

            {/* Floating Elements (like reference) */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-10 z-20 rounded-2xl bg-white p-4 shadow-xl shadow-black/10 max-w-[150px] rotate-[-6deg]"
            >
               <div className="flex items-center gap-2 mb-2">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                     <Gift size={16} />
                  </div>
                  <span className="text-xs font-bold text-gray-800">Wish Granted!</span>
               </div>
               <p className="text-xs text-gray-500">"Thank you for the school books!"</p>
            </motion.div>

            <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="absolute -right-6 bottom-20 z-20 rounded-full bg-secondary px-6 py-3 shadow-xl shadow-secondary/30 rotate-[3deg]"
            >
               <span className="font-heading font-bold text-secondary-foreground">100% Verified</span>
            </motion.div>
        </div>

      </div>
      
      {/* Bottom Wave decoration to merge with next section */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-[calc(100%+1.3px)] h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
    </section>
  )
}
