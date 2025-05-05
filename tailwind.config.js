/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './app/**/**/*.tsx'],
  theme: {
    extend: {
      blur:{'3xl':'80px'},
      animation:{gradient:'gradient 15s ease infinite'},
      keyframes:{gradient:{'0%,100%':{backgroundPosition:'0% 50%'},'50%':{backgroundPosition:'100% 50%'}}},
    },
  },
  plugins: [],
}
