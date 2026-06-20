/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { 50: '#EFF6FF', 100: '#DBEAFE', 500: '#3B82F6', 600: '#2563EB', 700: '#1D4ED8', 950: '#172554' },
        mint: { 50: '#ECFDF5', 500: '#10B981', 600: '#059669' },
        ink: '#172033',
        canvas: '#F6F8FC',
      },
      fontFamily: { sans: ['DM Sans', 'sans-serif'], display: ['Manrope', 'sans-serif'] },
      boxShadow: { soft: '0 16px 50px rgba(35, 52, 88, 0.08)', card: '0 8px 30px rgba(35, 52, 88, 0.07)' },
    },
  },
  plugins: [],
};
