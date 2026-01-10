'use client';

import PageHeader from '@/components/layout/PageHeader';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-[#020617]">
      <PageHeader 
        title="Get in touch" 
        subtitle="Have questions about Helpio? We're here to help you make an impact."
        badge="Contact Us"
      />

      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Contact Information</h3>
                <ContactItem icon={<Mail />} title="Email" desc="hello@helpio.app" />
                <ContactItem icon={<Phone />} title="Phone" desc="+1 (555) 000-0000" />
                <ContactItem icon={<MapPin />} title="Office" desc="Surat, Gujarat, India" />
              </div>
              
              <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">Join our Discord</h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">Connect with other donors and developers.</p>
                <button className="text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:underline">Join Community &rarr;</button>
              </div>
            </div>

            {/* Glass Form */}
            <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="First Name" placeholder="John" />
                  <InputGroup label="Last Name" placeholder="Doe" />
                </div>
                <InputGroup label="Email" placeholder="john@example.com" type="email" />
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
                  <textarea 
                    className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32 resize-none dark:text-white"
                    placeholder="How can we help?"
                  ></textarea>
                </div>
                <button className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:scale-[1.02] transition-transform">
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

function ContactItem({ icon, title, desc }: any) {
  return (
    <div className="flex gap-4 items-start">
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
        <p className="text-slate-600 dark:text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
      />
    </div>
  );
}
