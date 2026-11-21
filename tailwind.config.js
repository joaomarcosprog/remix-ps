/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Oswald', 'sans-serif'],
      },
      colors: {
        emergency: {
          red: '#DC2626',
          dark: '#991B1B',
          black: '#111111',
          gray: '#F3F4F6'
        }
      },
      backgroundImage: {
        'hazard-pattern': "repeating-linear-gradient(45deg, #DC2626, #DC2626 10px, #B91C1C 10px, #B91C1C 20px)",
      }
    }
  },
  plugins: [],
}
