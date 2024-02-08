/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        jost: ['Jost', 'sans-serif'],
      },
      backgroundImage: { background: 'url(/assets/background.jpg)', backgroundalt: 'url(/assets/background-alt.jpg)' },
    },
  },
  plugins: [],
};
