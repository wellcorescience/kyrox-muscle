import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1180px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        border: "hsl(var(--border))",
        gold: {
          50:  "#FBF7EE",
          100: "#F5EDD4",
          200: "#E8D49A",
          300: "#D4A82A",
          400: "#B9941C",
          500: "#8F6F10",
        },
        ivory: {
          50:  "#FDFCFA",
          100: "#FAF8F5",
          200: "#F2EDE5",
          300: "#E8E2D8",
        },
        metal: {
          100: "#f7f4ea",
          200: "#d9cda5",
          300: "#b9a468",
          400: "#8f793a",
          500: "#655423",
        },
        silver: {
          100: "#f8fafc",
          200: "#dce3ea",
          300: "#b8c3cf",
          400: "#8794a3",
          500: "#596575",
        },
        electric: {
          300: "#7df3ff",
          400: "#26d9ff",
          500: "#009de8",
          600: "#0878b5",
        },
        carbon: {
          900: "#050505",
          800: "#0b0b0d",
          700: "#151518",
          600: "#202026",
        },
        ember: {
          400: "#ff6a3d",
          500: "#f24a21",
          600: "#b92f17",
        },
      },
      fontFamily: {
        heading: ["var(--font-bebas)", "Impact", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 4px 14px rgba(185, 148, 28, 0.2)",
        "inner-metal": "inset 0 1px 0 rgba(255,255,255,0.6)",
        "premium": "0 1px 3px rgba(26, 23, 20, 0.06), 0 4px 16px rgba(26, 23, 20, 0.04)",
        "premium-hover": "0 4px 12px rgba(26, 23, 20, 0.1), 0 12px 32px rgba(26, 23, 20, 0.06)",
      },
      backgroundImage: {
        "metal-line":
          "linear-gradient(90deg, transparent, rgba(185, 148, 28, 0.4), transparent)",
        "radial-steel":
          "radial-gradient(circle at top, rgba(185, 148, 28, 0.08), transparent 36rem)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "shimmer-line": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 700ms ease-out both",
        "shimmer-line": "shimmer-line 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
