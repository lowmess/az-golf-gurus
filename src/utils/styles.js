import { css } from 'styled-components'

const themeHover = css`
  color: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.green};
  }
`

const reverseThemeHover = css`
  color: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.greens[2]};
  }
`

export { themeHover, reverseThemeHover }
