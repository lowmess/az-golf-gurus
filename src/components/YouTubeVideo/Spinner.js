import React from 'react'
import PropTypes from 'prop-types'
import { keyframes } from '@emotion/core'
import { Box, Flex } from 'rebass'

const backdropStyles = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 2,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.25)',
}

const spinning = keyframes`
  from {
    transform: rotateZ(0deg)
  }
  to {
    transform: rotateZ(359deg)
  }
`

const iconStyles = {
  position: 'relative',
  width: theme => theme.space[5],
  height: theme => theme.space[5],
  margin: 'auto',
  border: 3,
  borderLeftColor: 'transparent !important',
  borderRadius: '100%',
  animation: `${spinning} 1s linear infinite`,

  '&.is-wide': {
    width: theme => theme.space[6],
    height: theme => theme.space[6],
    border: 4,
  },
}

const Spinner = ({ videoSize, sx, ...props }) => (
  <Flex sx={{ ...backdropStyles, ...sx }} {...props}>
    <Box className={videoSize > 480 ? 'is-wide' : null} sx={iconStyles} />
  </Flex>
)

Spinner.propTypes = {
  videoSize: PropTypes.number.isRequired,
  sx: PropTypes.object,
}

Spinner.defaultProps = {
  videoSize: 0,
}

export default Spinner
