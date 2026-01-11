import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/shared/Providers';
import { LocalizationProvider } from '@/context/LocalizationContext';

// 1. Load Fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-display' });

// 2. SEO Metadata
export const metadata: Metadata = {
  title: 'Helpio | The Future of Philanthropy',
  description: 'Direct peer-to-peer giving platform. No fees, 100% transparency.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-50 transition-colors duration-300`}>
        
        {/* Layer 1: Performance & Theme Providers */}
        <Providers>
          
          {/* Layer 2: Localization Logic (Must be inside Providers if it uses Query later) */}
          <LocalizationProvider>
            
            <div className="flex flex-col min-h-screen">
              {/* Global Navigation */}
              <Navbar />
              
              {/* Page Content */}
              <div className="flex-grow">
                {children}
              </div>

              {/* Global Footer */}
              <Footer />
            </div>

          </LocalizationProvider>

        </Providers>
      </body>
    </html>
  );
}
