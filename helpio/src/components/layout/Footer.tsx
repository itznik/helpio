'use client';

import { Sparkles, Twitter, Instagram, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pt-16 pb-8 transition-colors relative z-10 mt-auto">
      <div className="container mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="bg-teal-50 dark:bg-teal-500/10 p-2 rounded-lg border border-teal-100 dark:border-teal-500/20">
                <Sparkles className="w-6 h-6 text-teal-600 dark:text-teal-500" />
              </div>
              <span className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                helpio<span className="text-teal-600 dark:text-teal-500">.</span>
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
              The modern platform connecting wealth with purpose. Rewriting the rules of philanthropy through transparency.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Twitter className="w-4 h-4" />} />
              <SocialIcon icon={<Instagram className="w-4 h-4" />} />
              <SocialIcon icon={<Linkedin className="w-4 h-4" />} />
              <SocialIcon icon={<Github className="w-4 h-4" />} />
            </div>
          </div>

          {/* Links */}
          <FooterColumn title="Platform">
            <FooterLink href="#">How it Works</FooterLink>
            <FooterLink href="#">Browse Wishes</FooterLink>
            <FooterLink href="#">Leaderboard</FooterLink>
            <FooterLink href="#">Pricing</FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            <FooterLink href="#">About Us</FooterLink>
            <FooterLink href="#">Careers</FooterLink>
            <FooterLink href="#">Blog</FooterLink>
            <FooterLink href="#">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="#">Cookie Policy</FooterLink>
            <FooterLink href="#">Transparency Report</FooterLink>
          </FooterColumn>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-500">
          <p>&copy; {new Date().getFullYear()} Helpio Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-bold text-slate-900 dark:text-white mb-6">{title}</h4>
      <ul className="space-y-4">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-slate-600 dark:text-slate-400 hover:text-teal-700 dark:hover:text-teal-400 text-sm transition-colors font-medium">
        {children}
      </Link>
    </li>
  );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <a href="#" className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all">
      {icon}
    </a>
  );
}
