/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medicare: {
          primary: '#2490C9',
          dark: '#126B9E',
          bg: '#F4F9FC',
          light: '#E6F4FA',
          textDark: '#102A43',
          textSec: '#64748B',
          border: '#D9E6EC',
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
