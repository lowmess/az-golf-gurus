import styled from 'styled-components'

const Backdrop = styled('div')`
  background-image: ${({ theme }) =>
    `linear-gradient(to bottom, ${theme.colors.greens[0]}, transparent ${
      theme.space[7]
    })`};
`

export default Backdrop
