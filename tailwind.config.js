/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        light: {
          primary: '#0C0950',
          secondary: '#473ec1',
          accent: '#B2A5FF',
          background: '#A6CDC6'
        },
        dark: {
          primary: '#DFD0B8',
          secondary: '#948979',
          accent: '#393E46',
          background: '#222831'
        }
      },
      animation: {
        fadeIn: 'fadeIn 1s cubic-bezier(0.4, 0, 0.2, 1)',
        slideUp: 'slideUp 1s cubic-bezier(0.4, 0, 0.2, 1)',
        pulseSlow: 'pulse 3s infinite',
        float: 'float 6s ease-in-out infinite',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};