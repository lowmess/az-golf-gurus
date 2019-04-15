import React from 'react'
import { Box } from 'rebass'

const FlagAbove = props => (
  <Box css="position: relative; top: 2px;" {...props}>
    <svg viewBox="0 0 1024 48" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 6.67c392.902 80.215 640.91-47.562 1024 7.679v33.427H0V6.67z" />
    </svg>
  </Box>
)

export default FlagAbove
