import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'rebass'

const Container = ({ children, ...props }) => (
  <Card {...props} mx="auto" px={3} css="max-width: 64rem">
    {children}
  </Card>
)

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Container
