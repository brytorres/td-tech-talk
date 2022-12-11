const colors = require('tailwindcss/colors')
module.exports = {
  content: ["./*.html"],
  darkMode: "class", // or 'media' or 'class'
  mode: "jit",
  theme: {
    extend: {
      colors: {
        //add your own color
        //https://tailwindcss.com/docs/customizing-colors
      },
      container: {
        center: true,
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};