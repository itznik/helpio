import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google"; // New Fonts
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Premium Serif for Headings
const fraunces = Fraunces({ 
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// Modern Sans for Body
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Helpio - Direct Impact, Zero Doubt",
  description: "The platform bridging generosity and genuine needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fraunces.variable} ${jakarta.variable} font-body bg-background antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="light" // Default to light to show off the colors
            enableSystem
            disableTransitionOnChange
          >
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
