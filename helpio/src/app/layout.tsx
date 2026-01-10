import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google"; // Importing fonts
import "./globals.css";
import Navbar from "@/components/layout/Navbar"; // We will build this next

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
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-teal-500 selection:text-white`}>
        {/* Navbar sits on top of everything */}
        <Navbar /> 
        {children}
      </body>
    </html>
  );
}
