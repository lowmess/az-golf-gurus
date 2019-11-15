import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'rebass'

const Container = ({ children, maxWidth, sx, ...props }) => (
  <Card
    sx={{
      marginX: 'auto',
      paddingX: 3,
      maxWidth,
      ...sx,
    }}
    {...props}
  >
    {children}
  </Card>
)

Container.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.string.isRequired,
  sx: PropTypes.object,
}

Container.defaultProps = {
  maxWidth: '64rem',
}

export default Container
