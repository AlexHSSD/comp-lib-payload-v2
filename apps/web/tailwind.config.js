const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    fontSize: {
      xs: ['0.75rem'], // 14
      sm: ['0.875rem'], // 14
      base: ['1rem'], // 16
      lg: ['1.125rem'], // 18
      xl: ['1.375rem'], // 22px
      '2xl': ['1.625rem'], // 26
      '3xl': ['1.75rem'], // 28
      '4xl': ['2.125rem'], // 34
      '5xl': ['2.375rem'], // 36
      '6xl': ['2.625rem'], // 42
      '7xl': ['2.875rem'], // 46
      '8xl': ['4rem'], // 64
    },
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)', 'montserrat', 'sans-serif'],
        secondary: ['var(--font-secondary)', 'montserrat', 'sans-serif'],
      },
      colors: {
        primary: '#4f6c55',
        grey: {
          100: '#eeeeee',
          200: '#efefef',
          400: '#bcbbb5',
        },
        green: {
          100: '#7c9e83',
          300: '#497055',
          400: '#4f6c55',
        },
        brandBlack: "#2B2E34",
        brown: '#36291D',
        brandGrey: '#4f5959',
        brandGreen: '#7BB69D',
        brandRed: '#ec665b',
        brandTeal: '#7bb69e',
        brandLightGrey: '#EBEDED',
        brandDarkGrey: '#4F5959',
      },
      padding: {
        'full' : '100%',
        'product': '133%',
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '6': '6px',
        '8': '8px',
      },
      translate: {
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
      },
      fontSize: {
        small: '0.813rem',
        normal: '1rem',
      },
      borderRadius: {
        'btn': '14px',
      },
      boxShadow: {
        'header': '0 2px 15px 0 rgba(0, 0, 0, 0.125)',
        'cards': '0px 0px 20px 0px rgba(0, 0, 0, 0.16)',
      },
      top: {
        submenu: 'calc(100% + 10px)',
      },
      screens: {
        'mob': {'max': '899px'},
        'nav': '900px',
      },
      animation: {
        loadingBarAnimation: 'loadingBarAnimation 1s ease-in-out',
        gradientAnimation: 'gradientAnimation 5s ease-in-out infinite alternate',
      },
      keyframes: {
        loadingBarAnimation: {
          '0%': {
            width: 0,
            background: '#7c9e83',
          },
          '50%': {
            opacity: 1,
            width: '100%',
          },
          '100%': {
            opacity: 0,
            width: '100%',
            background: '#4f6c55',
          }
        },
        gradientAnimation: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(-50%)',
          }
        }
      },
      width: {
        'cookiepopup': 'calc( 100% - 40px )',
        'hero': 'calc(50% - 18px)',
      },
      maxHeight: {
        'cookiepopup': 'calc(100vh - 200px)',
      },
      height: {
        '2px': '2px',
        '10px': '10px',
      },
      spacing: {
        '19': '4.75rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(function({ addVariant }) {
      addVariant('not-last', '&:not(:last-child)')
    }),
  ],
}

