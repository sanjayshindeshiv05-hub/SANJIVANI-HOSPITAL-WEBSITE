/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hospital: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fb',
          400: '#38a8f7',
          500: '#1b64da', // Primary Brand Blue
          600: '#1351be',
          700: '#10419b',
          800: '#12377e', // Deep Trust Navy
          900: '#0c2454',
          950: '#071635',
        },
        accent: {
          teal: '#0ea5e9',
          emerald: '#10b981',
          cyan: '#06b6d4'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        marathi: ['Noto Sans Devanagari', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(16, 65, 155, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'card': '0 10px 30px -4px rgba(12, 36, 84, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'hover': '0 20px 40px -6px rgba(27, 100, 218, 0.16), 0 8px 16px -4px rgba(0, 0, 0, 0.04)',
      }
    },
  },
  plugins: [],
}
