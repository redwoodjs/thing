module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        curtains: "url('../public/thin_curtains.jpg')",
      },
      fontFamily: {
        sacramento: ['Sacramento', 'cursive'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
