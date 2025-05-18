/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",
      },
      fontFamily: {
        sans: ["Sora", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
