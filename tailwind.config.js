/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        canopy: { DEFAULT: "#0F2E24", 700: "#164034", 600: "#1F5444", 400: "#5E8A79" },
        mist: { DEFAULT: "#EEF2EC", 200: "#DDE5DD", 300: "#C8D4C9" },
        coconut: { DEFAULT: "#F29A2E", 600: "#D97F14" },
        ink: { DEFAULT: "#14231C", 600: "#3D4F46", 400: "#6B7C73" },
        earth: { DEFAULT: "#9C3B22", 200: "#E9C9B5" },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        mega: ["clamp(3.4rem, 11vw, 10.5rem)", { lineHeight: "0.86", letterSpacing: "-0.045em" }],
        huge: ["clamp(2.6rem, 6.6vw, 6rem)", { lineHeight: "0.92", letterSpacing: "-0.035em" }],
        big: ["clamp(2rem, 4vw, 3.4rem)", { lineHeight: "1", letterSpacing: "-0.03em" }],
      },
      maxWidth: { page: "88rem" },
      transitionTimingFunction: { out: "cubic-bezier(.16,1,.3,1)" },
    },
  },
  plugins: [],
};
