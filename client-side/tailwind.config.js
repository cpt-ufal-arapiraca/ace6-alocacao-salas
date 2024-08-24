/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      colors: {
        button_blue: '#0095DA',
        button_blue_hover: '#092C4C',
        button_blue_active: '#536B82',
        button_red: '#ED1C24',

        alert_error: '#EB5757',
        alert_success: '#27AE60',

        border_sidebar: '#47B3E4',
        border_input: '#BDBDBD',
        border_subTitle: '#C4C4C4',

        table: '#E0E0E066',
        
        text_title: '#333333',
        text_primary: '#4F4F4F',
        text_secondary: '#828282'
      }
    },
  },
  plugins: [],
}

