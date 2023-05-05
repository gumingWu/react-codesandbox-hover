/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // Override base screen sizes
    screens: {
      ...defaultTheme.screens,
      betterhover: {raw: '(hover: hover)'},
      xs: '374px',
      '3xl': '1919px',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT:
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0px 0.8px 2px rgba(0, 0, 0, 0.032), 0px 2.7px 6.7px rgba(0, 0, 0, 0.048), 0px 12px 30px rgba(0, 0, 0, 0.08)',
      'lg-dark':
        '0 0 0 1px rgba(255,255,255,.15), 0px 0.8px 2px rgba(0, 0, 0, 0.032), 0px 2.7px 6.7px rgba(0, 0, 0, 0.048), 0px 12px 30px rgba(0, 0, 0, 0.08)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      nav: '0 16px 32px -16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0,0,0,.10)',
      'nav-dark':
        '0 16px 32px -16px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255,255,255,.05)',
      inner: 'inset 0 1px 4px 0 rgba(0, 0, 0, 0.05)',
      'inner-border': 'inset 0 0 0 1px rgba(0, 0, 0, 0.08)',
      'inner-border-dark': 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
      'outer-border': '0 0 0 1px rgba(0, 0, 0, 0.1)',
      'outer-border-dark': '0 0 0 1px rgba(255, 255, 255, 0.1)',
      'secondary-button-stroke': 'inset 0 0 0 1px #D9DBE3',
      'secondary-button-stroke-dark': 'inset 0 0 0 1px #404756',
      none: 'none',
    },
    extend: {
      backgroundImage: {
        'gradient-left-dark':
          'conic-gradient(from 90deg at -10% 100%, #2B303B 0deg, #2B303B 90deg, #16181D 360deg)',
        'gradient-right-dark':
          'conic-gradient(from -90deg at 110% 100%, #2B303B 0deg, #16181D 90deg, #16181D 360deg)',
        'gradient-left':
          'conic-gradient(from 90deg at -10% 100%, #BCC1CD 0deg, #BCC1CD 90deg, #FFFFFF 360deg)',
        'gradient-right':
          'conic-gradient(from -90deg at 110% 100%, #FFFFFF 0deg, #EBECF0 90deg, #EBECF0 360deg)',
        'meta-gradient': "url('/images/meta-gradient.png')",
        'meta-gradient-dark': "url('/images/meta-gradient-dark.png')",
      },
      maxWidth: {
        xs: '21rem',
      },
      outline: {
        blue: ['1px auto #087EA4', '3px'],
      },
      opacity: {
        8: '0.08',
      },
      fontFamily: {
        display: [
          'Optimistic Display',
          '-apple-system',
          ...defaultTheme.fontFamily.sans,
        ],
        text: [
          'Optimistic Text',
          '-apple-system',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: ['"Source Code Pro"', ...defaultTheme.fontFamily.mono],
      },
      lineHeight: {
        base: '30px',
        large: '38px',
        xl: '1.15',
      },
      fontSize: {
        '6xl': '52px',
        '5xl': '40px',
        '4xl': '32px',
        '3xl': '28px',
        '2xl': '24px',
        xl: '20px',
        lg: '17px',
        base: '15px',
        sm: '13px',
        xs: '11px',
        code: 'calc(1em - 20%)',
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        marquee2: 'marquee2 40s linear infinite',
        'large-marquee': 'large-marquee 80s linear infinite',
        'large-marquee2': 'large-marquee2 80s linear infinite',
      },
      keyframes: {
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        rotate: {
          from: {transform: 'rotate(0deg)'},
          to: {transform: 'rotate(180deg)'},
        },
        scale: {
          from: {transform: 'scale(0.8)'},
          '90%': {transform: 'scale(1.05)'},
          to: {transform: 'scale(1)'},
        },
        circle: {
          from: {transform: 'scale(0)', strokeWidth: '16px'},
          '50%': {transform: 'scale(0.5)', strokeWidth: '16px'},
          to: {transform: 'scale(1)', strokeWidth: '0px'},
        },
        marquee: {
          '0%': {transform: 'translateX(0%)'},
          '100%': {transform: 'translateX(-400%)'},
        },
        marquee2: {
          '0%': {transform: 'translateX(400%)'},
          '100%': {transform: 'translateX(0%)'},
        },
        'large-marquee': {
          '0%': {transform: 'translateX(0%)'},
          '100%': {transform: 'translateX(-200%)'},
        },
        'large-marquee2': {
          '0%': {transform: 'translateX(200%)'},
          '100%': {transform: 'translateX(0%)'},
        },
      },
      colors: {
        // Text colors
        primary: '#23272F', // gray-90
        'primary-dark': '#F6F7F9', // gray-5
        secondary: '#404756', // gray-70
        'secondary-dark': '#EBECF0', // gray-10
        tertiary: '#5E687E', // gray-50
        'tertiary-dark': '#99A1B3', // gray-30
        link: '#087EA4', // blue-50
        'link-dark': '#149ECA', // blue-40
        syntax: '#EBECF0', // gray-10
        wash: '#FFFFFF',
        'wash-dark': '#23272F', // gray-90
        card: '#F6F7F9', // gray-05
        'card-dark': '#343A46', // gray-80
        highlight: '#E6F7FF', // blue-10
        'highlight-dark': 'rgba(88,175,223,.1)',
        border: '#EBECF0', // gray-10
        'border-dark': '#343A46', // gray-80
        'secondary-button': '#EBECF0', // gray-10
        'secondary-button-dark': '#404756', // gray-70
      
        // Gray
        'gray-95': '#16181D',
        'gray-90': '#23272F',
        'gray-80': '#343A46',
        'gray-70': '#404756',
        'gray-60': '#4E5769',
        'gray-50': '#5E687E',
        'gray-40': '#78839B',
        'gray-30': '#99A1B3',
        'gray-20': '#BCC1CD',
        'gray-15': '#D0D3DC',
        'gray-10': '#EBECF0',
        'gray-5': '#F6F7F9',
      
        // Blue
        'blue-80': '#043849',
        'blue-60': '#045975',
        'blue-50': '#087EA4',
        'blue-40': '#149ECA', // Brand Blue
        'blue-30': '#58C4DC', // unused
        'blue-20': '#ABE2ED',
        'blue-10': '#E6F7FF', // todo: doesn't match illustrations
        'blue-5': '#E6F6FA',
      
        // Yellow
        'yellow-60': '#B65700',
        'yellow-50': '#C76A15',
        'yellow-40': '#DB7D27', // unused
        'yellow-30': '#FABD62', // unused
        'yellow-20': '#FCDEB0', // unused
        'yellow-10': '#FDE7C7',
        'yellow-5': '#FEF5E7',
      
        // Purple
        'purple-60': '#2B3491', // unused
        'purple-50': '#575FB7',
        'purple-40': '#6B75DB',
        'purple-30': '#8891EC',
        'purple-20': '#C3C8F5', // unused
        'purple-10': '#E7E9FB',
        'purple-5': '#F3F4FD',
      
        // Green
        'green-60': '#2B6E62',
        'green-50': '#388F7F',
        'green-40': '#44AC99',
        'green-30': '#7FCCBF',
        'green-20': '#ABDED5',
        'green-10': '#E5F5F2',
        'green-5': '#F4FBF9',
      
        // RED
        'red-60': '#712D28',
        'red-50': '#A6423A', // unused
        'red-40': '#C1554D',
        'red-30': '#D07D77',
        'red-20': '#E5B7B3', // unused
        'red-10': '#F2DBD9', // unused
        'red-5': '#FAF1F0',
      
        // MISC
        'code-block': '#99a1b30f', // gray-30 @ 6%
        'gradient-blue': '#58C4DC', // Only used for the landing gradient for now.
        github: {
          highlight: '#fffbdd',
        },
      },
      gridTemplateColumns: {
        'only-content': 'auto',
        'sidebar-content': '20rem auto',
        'sidebar-content-toc': '20rem auto 20rem',
      },
    },
  },
  plugins: [],
}

