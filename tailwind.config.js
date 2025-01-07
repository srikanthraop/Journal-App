/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
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
        lexend: ['"Lexend Deca"', ...fontFamily.sans],
        montserrat: ["Montserrat", ...fontFamily.sans],
        poppins: ["Poppins", ...fontFamily.sans],
        quicksand: ["Quicksand", ...fontFamily.sans],
        robotoMono: ['"Roboto Mono"', ...fontFamily.mono],
        spectral: ["Spectral", ...fontFamily.serif],
        playwrite: ['"Playwrite GB S"', ...fontFamily.serif],
      },
      colors: {},
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
