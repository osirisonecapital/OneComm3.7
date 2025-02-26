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
          DEFAULT: '#9c27b0', // Purple
          light: '#d05ce3',
          dark: '#6a0080',
        },
        secondary: {
          DEFAULT: '#e91e63', // Pink
          light: '#ff6090',
          dark: '#b0003a',
        },
        accent: {
          DEFAULT: '#3f51b5', // Blue
          light: '#757de8',
          dark: '#002984',
        },
        background: {
          DEFAULT: '#2c3a58', // Blend of green and blue
          light: '#234539', // Dark green with blue undertones
          dark: '#192a56', // Dark blue
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