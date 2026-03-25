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
          DEFAULT: "#2A2925",
          card: "#252219",
          surface: "#2D2922",
          hover: "#33302A",
        },
        text: {
          DEFAULT: "#DFDCD5",
          secondary: "#B8B3AA",
          tertiary: "#888888",
          dim: "#555555",
          inactive: "#3E3A33",
        },
        gold: {
          DEFAULT: "#B1987C",
          hover: "#CEAD95",
          deep: "#9A7D65",
        },
        success: "#5A8F6E",
        border: {
          DEFAULT: "rgba(255,255,255,0.05)",
          subtle: "rgba(255,255,255,0.08)",
          hover: "rgba(255,255,255,0.14)",
          gold: "rgba(177,152,124,0.2)",
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
