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
          DEFAULT: "#0A0A0A",
          card: "#141414",
          surface: "#1A1A1A",
        },
        text: {
          DEFAULT: "#F2EDE8",
          muted: "#908B83",
          dim: "#504D47",
        },
        coral: {
          DEFAULT: "#E2725B",
          hover: "#C45D48",
        },
        teal: {
          DEFAULT: "#3CC9AD",
        },
        gold: {
          DEFAULT: "#D4A03C",
        },
        border: {
          DEFAULT: "rgba(242,237,232,0.07)",
          hover: "rgba(242,237,232,0.14)",
        },
      },
      fontFamily: {
        serif: ["Instrument Serif", "Georgia", "serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
        pill: "20px",
      },
      keyframes: {
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
