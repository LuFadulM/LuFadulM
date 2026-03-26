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
          DEFAULT: "#0A0909",
          card: "#141413",
          surface: "#111110",
          hover: "#1A1A18",
          dark: "#050505",
        },
        text: {
          DEFAULT: "#F0EDE6",
          secondary: "#A8A49E",
          tertiary: "#706C67",
          dim: "#3D3D3B",
          inactive: "#252523",
        },
        gold: {
          DEFAULT: "#C9A84C",
          hover: "#E0C070",
          deep: "#A88A35",
          muted: "#8A7030",
        },
        sage: {
          DEFAULT: "#8A9E6A",
          light: "#A4B882",
          deep: "#647A48",
          muted: "#5C6B45",
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
