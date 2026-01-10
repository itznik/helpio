import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Will map to Midnight Navy
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#14b8a6", // Electric Teal
          dark: "#0d9488",
        },
        secondary: {
          DEFAULT: "#f59e0b", // Champagne Gold (Leaderboard)
        },
        dark: {
          900: "#020617", // Deep Black
          800: "#0f172a", // Midnight Navy
          700: "#1e293b",
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-clash)'], // We will set this up next
      },
    },
  },
  plugins: [],
};
export default config;
