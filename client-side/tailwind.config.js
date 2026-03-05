/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "navy-dark": "#0a192f",
        "navy-light": "#112240",
        "navy-border": "#233554",
        "cyan-primary": "#64ffda",
        "cyan-dark": "#4dffc4",
        "slate-secondary": "#8892b0",
        "lavender-text": "#ccd6f6",
        "white-bright": "#e6f1ff",
      },
      fontFamily: {
        sans: ["Calibre", "Inter", "San Francisco", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["SF Mono", "Fira Code", "Monaco", "monospace"],
      },
      fontSize: {
        "2xs": "0.6875rem",
        "3xl": "1.875rem",
        "7xl": "4.5rem",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-down": "fadeInDown 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-in": "slideIn 0.6s ease-out forwards",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(100, 255, 218, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(100, 255, 218, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backdropFilter: {
        blur: "blur(10px)",
      },
      boxShadow: {
        glow: "0 0 30px rgba(100, 255, 218, 0.3)",
        "glow-lg": "0 0 40px rgba(100, 255, 218, 0.5)",
      },
    },
  },
  plugins: [],
}
