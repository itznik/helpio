"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Heart } from "lucide-react" // Icons
import { motion } from "framer-motion"

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // Detect scroll to change navbar transparency
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-white/10 py-3 shadow-sm" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg transition-transform group-hover:rotate-12">
             <Heart className="h-5 w-5 fill-current" />
          </div>
          <span className={`text-2xl font-heading font-black tracking-tight ${isScrolled ? 'text-foreground' : 'text-white'}`}>
            Helpio
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className={`hidden md:flex items-center gap-8 font-medium ${isScrolled ? 'text-foreground' : 'text-white/90'}`}>
          <Link href="/wishes" className="hover:text-primary transition-colors">Wishes</Link>
          <Link href="/leaderboard" className="hover:text-primary transition-colors">Top Givers</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className={`font-bold hover:opacity-80 ${isScrolled ? 'text-foreground' : 'text-white'}`}>
            Log in
          </Link>
          <Link 
            href="/signup" 
            className="rounded-full bg-secondary px-6 py-2.5 font-bold text-secondary-foreground shadow-lg hover:scale-105 transition-transform"
          >
            Start Wishing
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 ${isScrolled ? 'text-foreground' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-8 w-8" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden bg-background border-b border-border px-4 py-4 space-y-4 shadow-xl"
        >
          <Link href="/wishes" className="block text-lg font-bold">Wishes</Link>
          <Link href="/leaderboard" className="block text-lg font-bold">Top Givers</Link>
          <div className="pt-4 flex flex-col gap-3">
            <button className="w-full h-12 rounded-xl border-2 border-primary text-primary font-bold">
              Log In
            </button>
            <button className="w-full h-12 rounded-xl bg-primary text-white font-bold shadow-lg">
              Start Wishing
            </button>
          </div>
        </motion.div>
      )}
    </header>
  )
}
