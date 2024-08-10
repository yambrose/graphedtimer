/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'round': ["Varela Round"]
      },
      colors: {
        sakaBlue: {
          50: '#7ED1FF',
          100: '#71BEE9',
          200: '#65B8E7',
        },
        sakaPink: {
          50: "#DE7EFF",
          100: "#CA6DEA",
          200: "#D871E9",
        },
        sakaGreen: {
          50: '#7EFFBA',
          100: '#71E9A1',
          200: '#65E7B0',
        },
        sakaYellow: {
          50: '#FFF27A',
          200: '#FFDB7E',
          100: '#E7E165',
        },
      },
      fontSize: {
        huge: '10rem',
        massive: '20rem',
        fatFricking: '30rem'
      },
      keyframes: {
        wiggle: {
          '0%': { transform: 'rotate(-3deg)' },
          '20%': { transform: 'rotate(20deg)' },
          '40%': { transform: 'rotate(-15deg)' },
          '60%': { transform: 'rotate(5deg)' },
          '90%': { transform: 'rotate(-1deg)' },
          '100%': { transform: 'rotate(0deg)' }
        }
      },
      animation: {
        'wiggle': 'wiggle 1s infinite'
      },
    },
  },
  plugins: [],
}