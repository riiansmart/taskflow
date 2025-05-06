/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.css",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--accent-primary)',
        secondary: 'var(--accent-secondary)',
        background: 'var(--bg-primary)',
        'background-secondary': 'var(--bg-secondary)',
        text: 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
      },
    },
  },
  plugins: [],
} 