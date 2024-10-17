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
        button_red_hover: '#8d1c24',

        cargo_user_admin: '#0095DA',
        cargo_user_gerente: '#27AE60',
        cargo_user_professor: '#E2B93B',

        bg_red_secondary: '#ED1C240F',

        alert_error: '#EB5757',
        alert_success: '#27AE60',

        border_sidebar: '#47B3E4',
        border_input: '#BDBDBD',
        border_subTitle: '#C4C4C4',

        table: '#E0E0E066',
        gray2: '#e0e0e0',
        
        text_title: '#333333',
        text_primary: '#4F4F4F',
        text_secondary: '#828282'
      }
    },
  },
  plugins: [],
}

