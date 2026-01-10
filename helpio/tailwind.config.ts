import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // Crucial for next-themes
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // THIS MAPS YOUR CSS VARIABLES TO TAILWIND CLASSES
      colors: {
        border: "var(--card-border)", 
        input: "var(--card-border)",
        ring: "var(--primary-accent)",
        background: "var(--background)", // Maps to #ffffff in light mode
        foreground: "var(--foreground)", // Maps to #020617 in light mode
        primary: {
          DEFAULT: "#0f172a", // Slate 900 (Black)
          foreground: "#ffffff", // White text on primary button
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#f1f5f9",
          foreground: "#64748b",
        },
        accent: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a",
        },
        popover: {
          DEFAULT: "var(--background)",
          foreground: "var(--foreground)",
        },
        card: {
          DEFAULT: "var(--card-bg)",
          foreground: "var(--foreground)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
