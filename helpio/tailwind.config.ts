import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <--- THIS IS THE FIX. WITHOUT THIS, LIGHT MODE WILL FAIL.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // We are defining explicit colors to avoid any variable confusion
        background: "var(--background)",
        foreground: "var(--foreground)",
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
