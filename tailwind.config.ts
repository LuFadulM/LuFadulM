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
          DEFAULT: "#F7F5F2",
          card:    "#FFFFFF",
          surface: "#EFEAE4",
          hover:   "#E8E2DA",
          dark:    "#1C1C1C",
        },
        text: {
          DEFAULT:   "#1C1C1C",
          secondary: "#6A6A6A",
          tertiary:  "#9A9A9A",
          dim:       "#C0BAB2",
          inactive:  "#D4CEC6",
        },
        gold: {
          DEFAULT: "#C6A85C",
          hover:   "#D4B870",
          deep:    "#A88A3A",
          muted:   "#8A7028",
        },
        sage: {
          DEFAULT: "#5A8A6A",
          light:   "#7AAA8A",
          deep:    "#3A6A4A",
          muted:   "#4A6A52",
        },
        success: "#5A8F6E",
        border: {
          DEFAULT: "rgba(0,0,0,0.08)",
          subtle:  "rgba(0,0,0,0.05)",
          hover:   "rgba(0,0,0,0.14)",
          gold:    "rgba(198,168,92,0.2)",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans:  ["Sora", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0",
        none:  "0",
        sm:    "0",
        md:    "0",
        lg:    "0",
        xl:    "0",
        "2xl": "0",
        "3xl": "0",
        full:  "0",
        card:  "0",
        btn:   "0",
        pill:  "0",
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
