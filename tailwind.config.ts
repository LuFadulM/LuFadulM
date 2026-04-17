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
          DEFAULT: "#0C0B09",
          card:    "#161410",
          surface: "#1E1B17",
          hover:   "#252219",
          dark:    "#050503",
          warm:    "#F2EDE4",
        },
        text: {
          DEFAULT:   "#F5F0E8",
          secondary: "rgba(245,240,232,0.65)",
          tertiary:  "rgba(245,240,232,0.45)",
          dim:       "rgba(245,240,232,0.35)",
          inactive:  "rgba(245,240,232,0.20)",
          dark:      "#1A1710",
        },
        gold: {
          DEFAULT: "#C9A84C",
          hover:   "#D4B860",
          deep:    "#A88A35",
          muted:   "#8A7028",
        },
        sage: {
          DEFAULT: "#8A9E6A",
          light:   "#A4B882",
          deep:    "#647A48",
          muted:   "#5C6B45",
        },
        success: "#5A8F6E",
        border: {
          DEFAULT: "rgba(245,240,232,0.07)",
          subtle:  "rgba(245,240,232,0.04)",
          hover:   "rgba(245,240,232,0.14)",
          gold:    "rgba(201,168,76,0.35)",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans:  ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0",
        none:  "0", sm: "0", md: "0", lg: "0",
        xl: "0", "2xl": "0", "3xl": "0",
        full: "0", card: "0", btn: "0", pill: "0",
      },
      letterSpacing: {
        micro: "0.15em",
        wide:  "0.08em",
      },
      keyframes: {
        "fade-in":  { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        "slide-up": { "0%": { transform: "translateY(16px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
      },
      animation: {
        "fade-in":  "fade-in 0.4s cubic-bezier(.2,0,.2,1)",
        "slide-up": "slide-up 0.5s cubic-bezier(.2,0,.2,1)",
      },
    },
  },
  plugins: [],
};

export default config;
