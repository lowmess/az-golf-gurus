const breakpoints = ['48em', '64em']

const colors = {
  green: '#4DB85C',
  greens: ['#C5E1B4', '#93C774', '#4DB85C', '#5B913D', '#4C7832'],

  red: '#EF1F26',
  reds: ['#FABAC8', '#F4718D', '#EF1F26', '#D81C44', '#9D1432'],

  yellow: '#EFC21F',
  yellows: ['#F8E49F', '#F2CF4F', '#EFC21F', '#D8AF1C', '#9D8014'],

  black: '#344236',
  grey: '#A3B8A6',
  white: '#FFFFFF',
  greys: ['#FFFFFF', '#EAEEEA', '#CAD5CB', '#A3B8A6', '#719075', '#344236'],
}

// Box-sizing & borders
const space = [0, '0.25rem', '0.5rem', '1rem', '2rem', '4rem', '8rem', '16rem']
const borders = [
  0,
  '0.125rem solid',
  '0.25rem solid',
  '0.5rem solid',
  '1rem solid',
  '2rem solid',
]
const radii = [0, '0.125rem', '0.25rem', '0.5rem', '1rem', '100%']

// Typography
const fonts = {
  'sans-serif':
    'geomanist, futura, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Oxygen, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  serif: 'georgia, times, serif',
}
const fontSizes = [
  '0.875rem',
  '1rem',
  '1.25rem',
  '1.5rem',
  '2.25rem',
  '3rem',
  '5rem',
  '6rem',
]
const fontWeights = {
  1: '100',
  2: '200',
  3: '300',
  4: '400',
  5: '500',
  6: '600',
  7: '700',
  normal: '400',
  book: '500',
  bold: '700',
}
const lineHeights = {
  title: 1.25,
  copy: 1.5,
}

const buttons = {
  primary: {
    borderRadius: radii[2],
    paddingTop: space[2],
    paddingRight: space[4],
    paddingBottom: space[2],
    paddingLeft: space[4],
    backgroundColor: colors.green,
    fontFamily: fonts['sans-serif'],
    fontWeight: fontWeights.normal,
    color: colors.white,
    transition: 'background-color 0.2s ease',

    '&:hover': {
      backgroundColor: colors.greens[3],
    },
  },
}

const theme = {
  breakpoints,
  colors,
  space,
  borders,
  radii,
  fonts,
  fontSizes,
  fontWeights,
  lineHeights,
  buttons,
}

module.exports = theme
