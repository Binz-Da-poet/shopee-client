/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMT = require('@material-tailwind/react/utils/withMT')

module.exports = withMT({
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true
    },
    extend: {
      colors: {
        orange: '#ee4d2d',
        login: 'rgb(248, 241, 233)',
        modal: 'rgb(0, 0, 0, 0.5)'
      },
      backgroundImage: {
        'bg-login': "url('./assets/bg-login-shoppe.jpg')"
      }
    }
  },
  plugins: []
})
