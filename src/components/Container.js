import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'rebass'

const Container = ({ children, maxWidth, ...props }) => (
  <Card {...props} mx="auto" px={3} css={{ maxWidth }}>
    {children}
  </Card>
)

Container.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string.isRequired,
}

Container.defaultProps = {
  maxWidth: '64rem',
}

export default Container
