import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#000000",
          card: "#0A0A0A",
          surface: "#111111",
          hover: "#141414",
        },
        text: {
          DEFAULT: "#F2F2F2",
          secondary: "#AFAFAF",
          tertiary: "#888888",
          dim: "#555555",
          inactive: "#333333",
        },
        gold: {
          DEFAULT: "#D4AF37",
          hover: "#F1D27A",
          deep: "#B8962E",
        },
        success: "#5A8F6E",
        border: {
          DEFAULT: "rgba(255,255,255,0.05)",
          subtle: "rgba(255,255,255,0.08)",
          hover: "rgba(255,255,255,0.14)",
          gold: "rgba(212,175,55,0.2)",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Sora", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0",
        none: "0",
        sm: "0",
        md: "0",
        lg: "0",
        xl: "0",
        "2xl": "0",
        "3xl": "0",
        full: "0",
        card: "0",
        btn: "0",
        pill: "0",
      },
      letterSpacing: {
        micro: "0.15em",
        wide: "0.08em",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(16px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s cubic-bezier(.2,0,.2,1)",
        "slide-up": "slide-up 0.5s cubic-bezier(.2,0,.2,1)",
      },
    },
  },
  plugins: [],
};

export default config;
