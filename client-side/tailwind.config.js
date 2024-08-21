/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      colors: {
        border_sidebar: '#47B3E4',
        text_title: '#333333',
        text_primary: '#4F4F4F',
        text_secondary: '#828282'
      }
    },
  },
  plugins: [],
}

