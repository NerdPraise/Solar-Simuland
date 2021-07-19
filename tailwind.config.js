module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['"Inter"', 'sans-serif'],
      body: ['"Inter"', 'sans-serif'],
    },
  },
  variants: {
    borderColor: ['focus', 'hover'],
    borderWidth: ['focus', 'hover'],
    color: ['focus', 'hover'],
    backgroundColor: ['focus', 'hover'],
    extend: {},
  },
  plugins: [],
}
