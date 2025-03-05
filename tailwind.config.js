/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007AFF",
        secondary: "#6C757D",
        success: "#28A745",
        warning: "#FFC107",
        danger: "#DC3545",
        light: "#F8F9FA",
        dark: "#343A40",
      },
      fontFamily: {
        sans: ['SF Pro Display', 'San Francisco', 'Helvetica Neue', 'sans-serif'],
      },
      maxWidth: {
        'mobile': '480px',
      }
    },
  },
  plugins: [],
} 