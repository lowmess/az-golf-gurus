import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'rebass'

const backdropStyles = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 2,
  width: '100%',
  height: '100%',
  transition: 'background-color 0.3s ease',

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
}

const iconStyles = {
  position: 'relative',
  width: theme => theme.space[5],
  height: theme => theme.space[5],
  margin: 'auto',
  border: 3,
  borderRadius: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  transition: 'transform 0.2s ease',

  '&.is-wide': {
    width: theme => theme.space[6],
    height: theme => theme.space[6],
    border: 4,
  },

  '&:hover': {
    transform: 'scale(1.2)',
  },

  svg: {
    position: 'relative',
    left: '7.5%',
    width: 'calc(100% / 1.5)',
    height: 'calc(100% / 1.5)',
    margin: 'auto',
  },
}

const PlayIcon = ({ title, videoSize, sx, ...props }) => (
  <Flex sx={{ ...backdropStyles, ...sx }} {...props}>
    <Flex className={videoSize > 480 ? 'is-wide' : null} sx={iconStyles}>
      <title>Play &ldquo;{title}&rdquo; video</title>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 32 32"
      >
        <path d="M4 4l24 12L4 28z" />
      </svg>
    </Flex>
  </Flex>
)

PlayIcon.propTypes = {
  title: PropTypes.string.isRequired,
  videoSize: PropTypes.number.isRequired,
  sx: PropTypes.object,
}

PlayIcon.defaultProps = {
  videoSize: 0,
}

export default PlayIcon
