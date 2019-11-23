import { colors } from './colors'
import { space, borders, radii } from './space'
import { fonts, lineHeights } from './typography'

const variants = {
  link: {
    color: 'inherit',

    '&:hover': {
      color: colors.green,
    },
  },

  'reverse-link': {
    color: 'inherit',

    '&:hover': {
      color: colors['light-green'],
    },
  },

  'unstyled-link': {
    color: 'inherit',
    textDecoration: 'none',
  },

  separator: {
    height: space[3],
    maxWidth: '40rem',
    marginY: 0,
    marginX: 'auto',
    border: 0,
    backgroundColor: colors.green,
  },
}

const text = {
  heading: {
    marginY: space[0],
    fontFamily: fonts.geomanist,
    fontSize: [3, 4],
    lineHeight: lineHeights.title,
  },

  paragraph: {
    maxWidth: '60ch',
    marginY: space[0],
    fontSize: [1, 2],
    lineHeight: lineHeights.copy,
  },

  list: {
    marginY: 0,
    paddingLeft: 0,
    listStyleType: 'none',
  },
}

const buttonBase = {
  display: 'inline-block',
  borderRadius: radii[2],
  fontFamily: fonts.geomanist,
  fontWeight: 'inherit',
  transition: 'all 0.2s ease',
}

const buttonSize = {
  paddingX: '2em',
  paddingY: '0.5em',
}

const buttonSizeSmall = {
  paddingX: '1em',
  paddingY: '0.25em',
}

const buttonColorsPrimary = {
  backgroundColor: colors.green,
  color: colors.white,

  '&:hover': {
    backgroundColor: colors.greens[6],
  },
}

const buttonColorsOutline = {
  border: borders[2],
  borderColor: colors.green,
  backgroundColor: 'transparent',
  color: colors.black,

  '&:hover': {
    backgroundColor: colors.green,
    color: colors.white,
  },
}

const buttonColorsOutlineReverse = {
  border: borders[2],
  borderColor: colors.white,
  backgroundColor: 'transparent',
  color: colors.white,

  '&:hover': {
    backgroundColor: colors.white,
    color: colors.green,
  },
}

const buttons = {
  reset: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    color: 'inherit',
    transition: 'all 0.2s ease',
  },

  'primary-small': {
    ...buttonBase,
    ...buttonSizeSmall,
    ...buttonColorsPrimary,
  },
  primary: {
    ...buttonBase,
    ...buttonSize,
    ...buttonColorsPrimary,
  },

  'outline-small': {
    ...buttonBase,
    ...buttonSizeSmall,
    ...buttonColorsOutline,
  },
  outline: {
    ...buttonBase,
    ...buttonSize,
    ...buttonColorsOutline,
  },

  'outline-reverse-small': {
    ...buttonBase,
    ...buttonSizeSmall,
    ...buttonColorsOutlineReverse,
  },
  'outline-reverse': {
    ...buttonBase,
    ...buttonSize,
    ...buttonColorsOutlineReverse,
  },
}

export { variants, text, buttons }
