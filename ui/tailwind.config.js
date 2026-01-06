/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        brandPurple: "#8443dc",
        brandGold: "#dfa720",
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #8443dc 0%, #dfa720 100%)',
      },
      boxShadow: {
        glass: '0 4px 32px 0 rgba(36, 37, 47, 0.12)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}; 