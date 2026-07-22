/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0284c7',
          600: '#0284c7',
          700: '#0369a1',
          accent: '#6366f1',
          dark: '#0b0f19',
          card: '#151c2c',
          border: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}
