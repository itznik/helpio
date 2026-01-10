import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Importing fonts
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; 
import { ThemeProvider } from "@/components/shared/ThemeProvider"; 

// 1. Configure Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Helpio | Grant a Wish",
  description: "A platform connecting wealth with need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 2. Inject Variables into Body */}
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-background text-foreground selection:bg-teal-500 selection:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow">
              {children}
            </div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
