import React from 'react'
import { css } from 'styled-components'
import { Box } from 'rebass'
import Hero from '../components/Hero'
import { Rule } from '../components/Typography'

const HomePage = () => {
  const background = css`
    background-image: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.greens[0]},
      transparent
    );
  `

  return (
    <>
      <Hero />
      <Box css={background} py={7}>
        <h1>yesssss hello i am the rest of the content</h1>
      </Box>
      <Rule mx="auto" />
      <Box py={7}>
        <h1>even more</h1>
      </Box>
    </>
  )
}

export default HomePage
