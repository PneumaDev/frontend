/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
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
  plugins: [
    flowbite.plugin(),
  ],
}