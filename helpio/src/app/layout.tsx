import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from 'sonner'; // Install sonner for beautiful toasts

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
        
        {/* Theme Provider (Dark Mode Logic) */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
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
          
          {/* Toast Notifications Container */}
          <Toaster position="bottom-right" theme="system" />
          
        </ThemeProvider>
      </body>
    </html>
  );
}
