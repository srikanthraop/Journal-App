/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        spectral: ["Spectral", "serif"], // Add Spectral as a custom font family
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
