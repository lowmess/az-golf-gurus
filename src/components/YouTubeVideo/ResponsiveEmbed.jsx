import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'rebass'

const ResponsiveContainer = ({ x, y, sx, children, ...props }) => (
  <Box
    sx={{
      position: 'relative',
      width: '100%',
      height: 0,
      paddingBottom: `${(y / x) * 100}%`,
      overflow: 'hidden',

      iframe: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },

      ...sx,
    }}
    {...props}
  >
    {children}
  </Box>
)

ResponsiveContainer.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
}

ResponsiveContainer.defaultProps = {
  x: 16,
  y: 9,
}

const AspectRatio = ({ children, ratio, ...props }) => {
  const [x, y] = ratio.split(':')

  return (
    <ResponsiveContainer x={x} y={y} {...props}>
      {children}
    </ResponsiveContainer>
  )
}

AspectRatio.propTypes = {
  children: PropTypes.node.isRequired,
  ratio: (props, propName, componentName) => {
    if (typeof props[propName] !== 'string' || !props[propName].includes(':')) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
      )
    }
  },
}

AspectRatio.defaultProps = {
  ratio: '16:9',
}

export default AspectRatio
