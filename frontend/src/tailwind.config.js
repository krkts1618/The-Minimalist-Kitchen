/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 🎯 CRITICAL: This tells tailwind to read your pages/components!
  ],
  darkMode: "class", // 🎯 CRITICAL: This links your useEffect documentElement toggler to tailwind!
  theme: {
    extend: {
      colors: {
        // Light Mode Palette (Fresh Slate)
        lightCanvas: "#F4F6F4",
        lightSurface: "#FFFFFF",
        lightBorder: "#E2E8F0",
        lightTextPrimary: "#0F1E2D",
        lightTextSecondary: "#61758A",

        // Dark Mode Palette (Ice-Cold Cyberpunk)
        darkCanvas: "#0A0F14",
        darkSurface: "#111A22",
        darkBorder: "#1F2E3D",
        darkTextPrimary: "#F0F4F8",
        darkTextSecondary: "#7A8B9E",

        // Unified Vibrant Accent
        accentCyan: "#00D2FF",
        accentCyanHover: "#00B8E6",
      },
    },
  },
  plugins: [],
};
