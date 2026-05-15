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
        glow: "0 0 40px rgba(185, 164, 104, 0.18)",
        "inner-metal": "inset 0 1px 0 rgba(255,255,255,0.12)",
      },
      backgroundImage: {
        "metal-line":
          "linear-gradient(90deg, transparent, rgba(217, 205, 165, 0.6), transparent)",
        "radial-steel":
          "radial-gradient(circle at top, rgba(217, 205, 165, 0.14), transparent 36rem)",
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
