import React from 'react'
import PropTypes from 'prop-types'
import { css, withTheme } from 'styled-components'
import { Box } from 'rebass'
import Hero from '../components/Hero'
import { Rule } from '../components/Typography'

const HomePage = ({ theme }) => {
  const bg = theme.colors.greens[0]

  const background = css`
    background-image: linear-gradient(
      to bottom,
      ${theme.colors.greens[0]},
      transparent
    );
  `

  return (
    <>
      <Hero bg={bg} />
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

HomePage.propTypes = {
  theme: PropTypes.object.isRequired,
}

export default withTheme(HomePage)
