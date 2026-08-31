import type { Config } from "tailwindcss";

// Light theme only — dark mode intentionally not implemented (brief §49).
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#004F6B",
          dark: "#013A4F",
          50: "#EAF2F5",
        },
        ink: "#0B1B22",
        accent: {
          DEFAULT: "#C6A56E",
          soft: "#EDE4D3",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          muted: "#F7F9FA",
        },
        ink2: "#17202A", // body text
        muted: "#667085",
        border: "#E5E7EB",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        script: ["var(--font-script)", "cursive"],
      },
      maxWidth: {
        content: "1440px",
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 27, 34, 0.04), 0 8px 24px -12px rgba(11, 27, 34, 0.10)",
        elevated: "0 12px 40px -16px rgba(11, 27, 34, 0.22)",
      },
      keyframes: {
        "fade-slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-slide-up": "fade-slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
