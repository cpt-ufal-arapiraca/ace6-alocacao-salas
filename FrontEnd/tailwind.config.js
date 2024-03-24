/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "text": "#FFFFFF",
        "black-1": "#000000",
        "black-2": "#1D1D1D",
        "black-3": "#282828",
        "gray-1": "#333333",
        "gray-2": "#4F4F4F",
        "gray-3": "#828282",
        "gray-4": "#BDBDBD",
        "gray-5": "#E0E0E0",
        "primary": "#0095DA",
        "secondary": "#ED1C24",
        "hover-primary": "#092C4C",
        "hover-secondary": "#7c0509",
        "info": "#2F80ED",
        "success": "#27AE60",
        "warning": "#E2B93B",
        "error": "#EB5757"
      }
    },
  },
  plugins: [],
}

