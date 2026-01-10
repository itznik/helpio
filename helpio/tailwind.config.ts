import type { Config } from "tailwindcss";

const config: Config = {
  // 1. THIS IS THE CRITICAL FIX.
  // It forces Tailwind to wait for the "dark" class instead of checking your OS.
  darkMode: "class", 
  
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-outfit)"],
      },
    },
  },
  plugins: [],
};
export default config;
