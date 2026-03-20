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
          DEFAULT: "#0A0A09",
          card: "#111110",
          surface: "#141413",
          hover: "#161615",
        },
        text: {
          DEFAULT: "#D4D0C8",
          secondary: "#706D64",
          tertiary: "#4A4843",
          dim: "#3A3835",
          inactive: "#2A2A28",
        },
        gold: {
          DEFAULT: "#C8A44E",
          hover: "#D4B05A",
        },
        success: "#5A8F6E",
        border: {
          DEFAULT: "rgba(255,255,255,0.04)",
          subtle: "rgba(255,255,255,0.06)",
          hover: "rgba(255,255,255,0.08)",
          gold: "rgba(200,164,78,0.15)",
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
