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
          DEFAULT: "#07120D",
          card:    "#0C1912",
          surface: "#12241B",
          hover:   "#1A2C22",
          dark:    "#050503",
          warm:    "#EAF1E9",
        },
        text: {
          DEFAULT:   "#EFF4EE",
          secondary: "rgba(236,243,238,0.65)",
          tertiary:  "rgba(236,243,238,0.45)",
          dim:       "rgba(236,243,238,0.35)",
          inactive:  "rgba(236,243,238,0.20)",
          dark:      "#0D1B14",
        },
        gold: {
          DEFAULT: "#3DDC97",
          hover:   "#5CE8AC",
          deep:    "#0E7A5C",
          muted:   "#147A56",
        },
        coral: {
          DEFAULT: "#E8785A",
          muted:   "rgba(232,120,90,0.12)",
        },
        sage: {
          DEFAULT: "#8A9E6A",
          light:   "#A4B882",
          deep:    "#647A48",
          muted:   "#5C6B45",
        },
        success: "#5A8F6E",
        border: {
          DEFAULT: "rgba(236,243,238,0.07)",
          subtle:  "rgba(236,243,238,0.04)",
          hover:   "rgba(236,243,238,0.14)",
          gold:    "rgba(61,220,151,0.35)",
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
