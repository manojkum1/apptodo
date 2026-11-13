/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#F1F4FF',
          100: '#E3E8FF',
          200: '#D9DCFB',
          500: '#4361EE',
          600: '#4361EE',
          700: '#3651D4',
          navy: '#243A9C',
        },
        pending: {
          bg: '#FFE9E9',
          icon: '#F26D78',
        },
        ink: {
          900: '#1D1D35',
          600: '#6B6D85',
          400: '#A9ABBF',
          100: '#E6E8F2',
        },
      },
      keyframes: {
        sheetUp: { from: { transform: 'translateY(100%)' }, to: { transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      },
      animation: {
        sheetUp: 'sheetUp .28s cubic-bezier(.2,.8,.2,1)',
        fadeIn: 'fadeIn .2s ease-out',
      },
    },
  },
  plugins: [],
};
