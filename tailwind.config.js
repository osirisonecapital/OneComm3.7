/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8e24aa', // Slightly darker purple for better contrast on light bg
          light: '#b935d2',
          dark: '#5c007a',
        },
        secondary: {
          DEFAULT: '#d81b60', // Darker pink for better contrast on light bg
          light: '#ff5c8d',
          dark: '#a00037',
        },
        accent: {
          DEFAULT: '#3949ab', // Slightly darker blue for contrast
          light: '#6f74dd',
          dark: '#00227b',
        },
        background: {
          DEFAULT: '#fef2f6', // Light pink/red
          light: '#ffffff',
          dark: '#f8e5eb',
          blue: '#f0f4ff', // Light blue for gradient
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
    },
  },
  plugins: [],
} 