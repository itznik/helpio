'use client';

import WishCard from '../ui/WishCard';
import { motion } from 'framer-motion';

const WISHES = [
  {
    id: 1,
    name: "Aarav P.",
    avatar: "https://i.pravatar.cc/150?u=a",
    wish: "Laptop for Coding Bootcamp",
    story: "I have been learning Python on my phone for 6 months. I got accepted into a bootcamp but I need a laptop to compile code efficiently.",
    amount: 450,
    category: "Education",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah M.",
    avatar: "https://i.pravatar.cc/150?u=s",
    wish: "Wheelchair Repair Kit",
    story: "My wheelchair's left wheel is damaged, making it hard to get to my part-time job. I just need the parts to fix it myself.",
    amount: 120,
    category: "Health",
    verified: true,
  },
  {
    id: 3,
    name: "Davide B.",
    avatar: "https://i.pravatar.cc/150?u=d",
    wish: "Art Supplies for Portfolio",
    story: "I am a digital artist trying to get commissions. My drawing tablet broke last week and I can't work without it.",
    amount: 85,
    category: "Career",
    verified: false,
  }
];

export default function WishFeed() {
  return (
    <section className="container mx-auto px-6 relative z-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          {/* Title: Dark in Light Mode */}
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-2">
            Latest Requests
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium">Real people. Real needs. Verified impact.</p>
        </div>
        <button className="text-teal-700 dark:text-teal-400 font-bold hover:underline transition-all">
          View all categories &rarr;
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {WISHES.map((wish, index) => (
          <motion.div
            key={wish.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <WishCard {...wish} />
          </motion.div>
        ))}
      </div>

    </section>
  );
}
