import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        brand: {
          purple: "#7F77DD",
          teal: "#1D9E75",
          coral: "#D85A30",
          blue: "#378ADD",
        },
      },
    },
  },
  plugins: [],
};
export default config;
