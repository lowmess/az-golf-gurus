import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'rebass'

const Container = ({ children, ...props }) => (
  <Box {...props} mx="auto" px={3} css="max-width: 64rem">
    {children}
  </Box>
)

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Container
