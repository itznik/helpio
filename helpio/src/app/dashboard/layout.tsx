import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] relative">
      {/* CRITICAL FIX: 
         We do NOT include <Navbar /> here. 
         It is already rendered by RootLayout (src/app/layout.tsx).
         Including it here causes the "Double Navbar" glitch.
      */}

      {/* Background Visuals for Dashboard (Optional High-End Touch) 
        Keeps the dashboard feeling distinct but consistent.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
         <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Content Wrapper */}
      {/* The pt-24 ensures content isn't hidden behind the fixed Navbar */}
      <div className="relative z-10 pt-24 md:pt-28 pb-12">
        {children}
      </div>
    </div>
  );
}
