import type { Config } from "tailwindcss";

const config: Config = {
  // 'class' strategy forces Tailwind to wait for the .dark class from your toggle
  darkMode: "class", 
  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Mapping CSS variables (Standard V3 Method)
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-outfit)"],
      },
    },
  },
  plugins: [],
};
export default config;
