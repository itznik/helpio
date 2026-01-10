'use client';

import Link from 'next/link';
import { Sparkles, Twitter, Instagram, Linkedin, Github, Heart, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 dark:bg-[#020617] pt-32 pb-12 overflow-hidden border-t border-slate-200 dark:border-slate-800">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-teal-500/5 dark:bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* TOP CTA SECTION */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100/50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Heart className="w-4 h-4 fill-current" />
            <span>Join the movement</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 dark:text-white mb-8 tracking-tight">
            Ready to change a life?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
             <input 
               type="email" 
               placeholder="Enter your email address" 
               className="flex-1 px-6 py-4 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
             />
             <button className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-105 transition-transform shadow-lg flex items-center justify-center gap-2">
               Get Started <ArrowRight className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20 border-t border-slate-200 dark:border-slate-800 pt-16">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-8 h-8 bg-gradient-to-tr from-teal-400 to-indigo-500 rounded-lg flex items-center justify-center text-white shadow-md group-hover:rotate-12 transition-transform">
                <Sparkles className="w-5 h-5 fill-white" />
              </div>
              <span className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                helpio<span className="text-teal-500">.</span>
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xs leading-relaxed">
              The modern platform connecting wealth with purpose. Rewriting the rules of philanthropy through radical transparency.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Twitter className="w-5 h-5" />} href="#" />
              <SocialIcon icon={<Instagram className="w-5 h-5" />} href="#" />
              <SocialIcon icon={<Linkedin className="w-5 h-5" />} href="#" />
              <SocialIcon icon={<Github className="w-5 h-5" />} href="#" />
            </div>
          </div>

          {/* Links Columns */}
          <FooterColumn 
            title="Platform" 
            links={[
              { label: "How it Works", href: "#" },
              { label: "Browse Wishes", href: "#" },
              { label: "Leaderboard", href: "#" },
              { label: "Success Stories", href: "#" },
            ]} 
          />
          <FooterColumn 
            title="Company" 
            links={[
              { label: "About Us", href: "#" },
              { label: "Careers", href: "#" },
              { label: "Blog", href: "#" },
              { label: "Contact", href: "/contact" },
            ]} 
          />
          <FooterColumn 
            title="Legal" 
            links={[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "#" },
              { label: "Transparency Report", href: "#" },
            ]} 
          />
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-500 font-medium">
          <p>© 2026 Helpio Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

// Sub-components for cleaner code
function SocialIcon({ icon, href }: any) {
  return (
    <Link href={href} className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-500 transition-all hover:-translate-y-1 shadow-sm">
      {icon}
    </Link>
  );
}

function FooterColumn({ title, links }: any) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
      {links.map((link: any) => (
        <Link 
          key={link.label} 
          href={link.href} 
          className="text-slate-600 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors font-medium"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
