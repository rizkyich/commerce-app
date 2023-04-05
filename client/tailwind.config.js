/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "majorelle-blue": "#613FE5",
        "chinese-black": "#120E16",
        "cultured": "#F6F6F7",
        "gray-silver": "#B5B5B5"
      },
    },
  },
  plugins: [],
}