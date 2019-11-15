import { colors } from './colors'
import { borders, radii } from './space'
import { fonts } from './typography'

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

export { buttons }
