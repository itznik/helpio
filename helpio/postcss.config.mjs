/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // CRITICAL FIX: Use the new package name for Tailwind v4
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};

export default config;
