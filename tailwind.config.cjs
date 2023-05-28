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
        cartbg: 'rgb(245, 245, 245)',
        login: 'rgb(248, 241, 233)',
        modal: 'rgb(0, 0, 0, 0.5)'
      },
      height: {
        128: '2px'
      },
      backgroundImage: {
        'bg-login': "url('./assets/bg-login-shoppe.jpg')"
      },
      flexGrow: {
        2: '2',
        4: '4',
        6: '6'
      },
      zIndex: {
        2000: '2000'
      }
    }
  },
  plugins: []
})
