/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#131342',
        secondary: '#ffffff',
        accent: '#ff4d4d',
        text: '#333333',
        lightGray: '#f5f5f5',
      },
    },
  },
  plugins: [],
} 