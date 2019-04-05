import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { Box } from 'rebass'
import { Rule } from '../components/Typography'
import Hero from '../components/Hero'
import FeaturedVideo from '../components/FeaturedVideo'

const HomePage = ({ theme }) => {
  const bg = theme.colors.greens[0]

  return (
    <>
      <Hero bg={bg} />
      <FeaturedVideo bg={bg} pt={[5, 6]} />
      <Rule my={[5, 6]} mx="auto" />
      <Box mb={6}>
        <h1>even more</h1>
      </Box>
    </>
  )
}

HomePage.propTypes = {
  theme: PropTypes.object.isRequired,
}

export default withTheme(HomePage)
