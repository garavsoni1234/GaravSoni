module.exports = {
  purge: ['./src/**/*.{js,jsx}'], // if using typescript, add 'ts,tsx' inside the brackets
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      // generated with https://www.tailwindshades.com/
      colors: {
        'smsoftware-blue': {
          DEFAULT: '#1E5583',
          50: '#9EC7E9',
          100: '#89BBE4',
          200: '#60A2DA',
          300: '#368AD1',
          400: '#2870AC',
          500: '#1E5583',
          600: '#19486E',
          700: '#143A5A',
          800: '#102D45',
          900: '#0B1F30',
        },
        'smsoftware-yellow': {
          DEFAULT: '#E3C33D',
          50: '#FAF5DD',
          100: '#F8EFCC',
          200: '#F2E4A8',
          300: '#EDD984',
          400: '#E8CE61',
          500: '#E3C33D',
          600: '#CFAD1E',
          700: '#A38817',
          800: '#766311',
          900: '#493D0B',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
