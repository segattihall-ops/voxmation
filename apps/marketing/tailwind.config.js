/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1F3A",
        "navy-deep": "#060A10",
        "navy-mid": "#0D2040",
        orange: { brand: "#FF8A1F", warm: "#FFB347", dark: "#E06B00" },
        offwhite: "#F7F5F0",
        "gray-dim": "#8A99B3",
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-space)", "system-ui", "sans-serif"],
        sans: ["var(--font-space)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-grad": "linear-gradient(135deg, #060A10 0%, #0B1F3A 50%, #080D18 100%)",
        "orange-grad": "linear-gradient(135deg, #FF8A1F 0%, #FFB347 100%)",
        "blue-grad": "linear-gradient(135deg, #1E4B8F 0%, #0B1F3A 100%)",
        "cta-grad": "linear-gradient(135deg, #0B1F3A 0%, #0D2040 40%, #FF8A1F 100%)",
      },
      boxShadow: {
        "orange-glow": "0 0 0 1px rgba(255,138,31,0.3), 0 0 30px rgba(255,138,31,0.2)",
        "orange-glow-lg": "0 0 60px rgba(255,138,31,0.4), 0 0 120px rgba(255,138,31,0.15)",
        "card": "0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 40px rgba(0,0,0,0.5)",
        "card-hover": "0 1px 0 rgba(255,138,31,0.2) inset, 0 16px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,138,31,0.2)",
      },
      animation: {
        "wave": "wave 1.2s ease-in-out infinite",
        "float": "float 5s ease-in-out infinite",
        "scan": "scan 3s linear infinite",
        "counter": "counter 2s ease-out forwards",
        "magnetic": "magnetic 0.3s ease-out",
      },
      keyframes: {
        wave: { "0%,100%": { transform: "scaleY(0.3)" }, "50%": { transform: "scaleY(1)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(400%)" } },
      },
      transitionTimingFunction: {
        "spring": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "smooth": "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
