const breakpoints = ['48em', '64em']

// more colors at https://palx.jxnblk.com/15ab3d.json
const colors = {
  green: '#15ab3d',
  greens: [
    '#e4f5e9',
    '#c8ebd1',
    '#a7dfb6',
    '#81d297',
    '#53c170',
    '#15ab3d',
    '#129a37',
    '#108730',
    '#0d7027',
    '#09501c',
  ],

  red: '#ab3d15',
  reds: [
    '#f6ebe7',
    '#edd6cd',
    '#e2bdb0',
    '#d5a08c',
    '#c57a5e',
    '#ab3d15',
    '#993612',
    '#862f10',
    '#6e270d',
    '#4d1b09',
  ],

  // yellows not pulled from same palette as other shades
  yellow: '#efc21f',
  yellows: [
    '#fcf6e1',
    '#faeec1',
    '#f8e49f',
    '#f5da79',
    '#f2cf4f',
    '#efc21f',
    '#d8af1c',
    '#be9a18',
    '#9d8014',
    '#725c0e',
  ],

  white: '#ffffff',
  gray: '#bcc6bf',
  black: '#334237',
  grays: [
    '#ffffff',
    '#f8f9f8',
    '#ebeeec',
    '#dde1de',
    '#cdd4cf',
    '#bcc6bf',
    '#aab5ad',
    '#94a398',
    '#7b8d7f',
    '#5a7160',
    '#334237',
  ],
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
  thin: 100,
  'extra-light': 200,
  light: 300,
  normal: '400',
  medium: 500,
  'semi-bold': 800,
  bold: '700',
  'extra-bold': 800,
  black: 900,
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
      backgroundColor: colors.greens[6],
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
