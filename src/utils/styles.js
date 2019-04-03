import { css } from 'styled-components'

const themeHover = css`
  color: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.green};
  }
`

export { themeHover }
