/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}", '!./node_modules/**/*'],
  theme: {
    extend: {},
  },
  plugins: [],

  corePlugins: {
    preflight: false, // Disable the base styles (reset and normalization)
  },
}

