/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
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
  }
  // plugins: [require('@tailwindcss/line-clamp')]
}
