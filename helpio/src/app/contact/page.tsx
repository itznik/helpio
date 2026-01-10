'use client';

import PageHeader from '@/components/layout/PageHeader';
import { Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617]">
      <PageHeader 
        title="Let's Start a Conversation" 
        subtitle="Whether you're a donor, a recipient, or just curious—we're here."
        badge="Contact Us"
      />

      <section className="pb-32 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            
            {/* Left: Info & Visuals */}
            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ContactCard icon={<Mail />} title="Email" desc="hello@helpio.app" color="teal" />
                <ContactCard icon={<Phone />} title="Phone" desc="+91 98765 43210" color="indigo" />
                <ContactCard icon={<MapPin />} title="HQ" desc="Surat, Gujarat, India" color="purple" />
                <ContactCard icon={<MessageCircle />} title="Support" desc="24/7 Live Chat" color="amber" />
              </div>

              {/* Community Box */}
              <div className="relative p-8 rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 overflow-hidden text-white dark:text-slate-900 shadow-2xl">
                 <div className="relative z-10">
                   <h3 className="text-2xl font-bold mb-2">Join our Developer Community</h3>
                   <p className="opacity-80 mb-6">Building the future of open-source philanthropy. Connect with us on Discord.</p>
                   <button className="px-6 py-3 rounded-xl bg-white/20 dark:bg-black/10 backdrop-blur-md font-bold hover:bg-white/30 transition-colors">
                     Join Discord &rarr;
                   </button>
                 </div>
                 {/* Decorative Circle */}
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500 rounded-full blur-[60px] opacity-50" />
              </div>
            </div>

            {/* Right: Glass Form */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputGroup label="First Name" placeholder="Jane" />
                  <InputGroup label="Last Name" placeholder="Doe" />
                </div>
                <InputGroup label="Email" placeholder="jane@example.com" type="email" />
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Message</label>
                  <textarea 
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 h-40 resize-none dark:text-white font-medium transition-all"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>
                <button className="w-full py-5 rounded-2xl bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-bold text-lg hover:shadow-lg hover:scale-[1.01] transition-all">
                  Send Message
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}

function ContactCard({ icon, title, desc, color }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-2xl bg-${color}-50 dark:bg-${color}-900/20 flex items-center justify-center text-${color}-600 dark:text-${color}-400 mb-4`}>
        {icon}
      </div>
      <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-1">{title}</h4>
      <p className="text-slate-500 dark:text-slate-400 font-medium">{desc}</p>
    </div>
  );
}

function InputGroup({ label, placeholder, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white font-medium transition-all"
      />
    </div>
  );
}
