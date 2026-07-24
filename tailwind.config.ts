import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#F6F8FB",
        card: "#FFFFFF",
        "card-secondary": "#FBFCFE",

        border: "#E5EAF2",
        "border-strong": "#D6DEE8",
        divider: "#EEF2F7",

        heading: "#172B4D",
        body: "#42526E",
        "body-secondary": "#6B778C",
        muted: "#A5ADBA",

        brand: "#C41D33",
        "brand-hover": "#A5172B",
        "brand-light": "#FCECEF",
        "brand-xlight": "#FFF5F6",

        "accent-pos": "#2563EB",
        "accent-pos-hover": "#1D4ED8",
        "accent-pos-light": "#DBEAFE",
        "accent-pos-xlight": "#EFF6FF",
        "accent-big-pos": "#2563EB",

        "accent-neg": "#DC2626",
        "accent-neg-hover": "#B91C1C",
        "accent-neg-light": "#FEE2E2",
        "accent-neg-xlight": "#FEF2F2",

        alert: "#F59E0B",
        "alert-light": "#FEF3C7",

        "gray-100": "#F3F5F8",
        "gray-300": "#CBD5E1",
        "gray-700": "#475569",

        "zone-1": "#60A5FA",
        "zone-2": "#2563EB",
        "zone-3": "#F59E0B",
        "zone-4": "#EF4444",
        "zone-5": "#C41D33",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-poppins)", "sans-serif"],
      },
      borderRadius: {
        xl2: "18px",
      },
    },
  },
  plugins: [],
};

export default config;
