import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        secondary: "#0A0A0A",
        accent: "#888888",
        "garden-dark": "#0A0A0A",
        "garden-light": "#F5F5F5",
        gray: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#0A0A0A",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["4rem", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-lg": [
          "6rem",
          { lineHeight: "0.85", letterSpacing: "-0.02em" },
        ],
        "display-xl": ["8rem", { lineHeight: "0.8", letterSpacing: "-0.03em" }],
      },
    },
  },
  plugins: [],
};

export default config;
