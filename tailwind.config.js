/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: '#C4A78B',
        danger: '#1B1A1B',
        secondary: '#5E4634', 
        success: '#CFC1A1',
        brown: '#917457'
      },
    },
  },
  plugins: [],
}
