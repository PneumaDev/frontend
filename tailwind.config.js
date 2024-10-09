/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        yantramanav: ["Yantramanav", "sans-serif"],
        muktaVaani: ["Mukta Vaani", "sans-serif"],
        imprima: ["Imprima", "sans-serif"],
      },
    },
  },
  plugins: [],
}