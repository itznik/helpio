'use client';

import PageHeader from '@/components/layout/PageHeader';
import { motion } from 'framer-motion';
import { Quote, Heart } from 'lucide-react';

const STORIES = [
  { id: 1, name: "Maria Garcia", role: "Small Business Owner", img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=600", quote: "The freezer I received saved my ice cream shop during the summer heatwave.", impact: "$800 Grant", location: "Surat" },
  { id: 2, name: "David Chen", role: "Aspiring Coder", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600", quote: "With my new laptop, I landed my first freelance contract in just 3 weeks.", impact: "$450 Grant", location: "Mumbai" },
  { id: 3, name: "Sarah Johnson", role: "Single Mom", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600", quote: "Helpio covered my car repairs so I could keep my delivery job. Truly a lifesaver.", impact: "$320 Grant", location: "Delhi" },
  { id: 4, name: "James Wilson", role: "Student", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600", quote: "I can finally attend online classes without borrowing my neighbor's phone.", impact: "$150 Grant", location: "Bangalore" },
];

export default function StoriesPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#020617]">
      <PageHeader 
        title="Impact Stories" 
        subtitle="Real people. Real lives changed. See the ripple effect of your generosity."
        badge="Success Stories"
      />

      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STORIES.map((story, i) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative break-inside-avoid"
              >
                {/* Image Card */}
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-lg">
                  <img src={story.img} alt={story.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <Quote className="w-8 h-8 text-teal-400 mb-4 opacity-80" />
                    <p className="text-lg font-medium leading-relaxed mb-6">"{story.quote}"</p>
                    
                    <div className="flex items-center justify-between border-t border-white/20 pt-4">
                      <div>
                        <h4 className="font-bold text-lg">{story.name}</h4>
                        <p className="text-sm text-slate-300">{story.role} • {story.location}</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                        {story.impact}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
