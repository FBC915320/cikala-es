import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17211b",
        forest: "#2f5d50",
        moss: "#7d9a73",
        clay: "#b86f4b",
        linen: "#f5f1e8",
        mist: "#eef3f1"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"]
      },
      boxShadow: {
        soft: "0 18px 60px rgba(23, 33, 27, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
