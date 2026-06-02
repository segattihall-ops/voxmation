/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1F3A",
        "navy-light": "#0D2347",
        "brand-blue": "#1E4B8F",
        "bright-blue": "#006DFF",
        "brand-orange": "#FF8A1F",
        "brand-gold": "#FFB347",
        "light-bg": "#F4F6F9",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #0B1F3A 0%, #0D2347 50%, #0a1c35 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(30,75,143,0.25) 0%, rgba(11,31,58,0.5) 100%)",
        "orange-gradient": "linear-gradient(135deg, #FF8A1F 0%, #FFB347 100%)",
        "blue-gradient": "linear-gradient(135deg, #1E4B8F 0%, #006DFF 100%)",
      },
      boxShadow: {
        "orange-glow": "0 0 40px rgba(255,138,31,0.35), 0 0 80px rgba(255,138,31,0.15)",
        "blue-glow": "0 0 40px rgba(30,75,143,0.5), 0 0 80px rgba(0,109,255,0.2)",
        "card": "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(30,75,143,0.25)",
        "card-hover": "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,138,31,0.35)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "wave-bar": "waveBar 1.4s ease-in-out infinite",
        "ping-slow": "ping 3s cubic-bezier(0,0,0.2,1) infinite",
        "spin-slow": "spin 10s linear infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        waveBar: {
          "0%,100%": { transform: "scaleY(0.4)" },
          "50%": { transform: "scaleY(1.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
