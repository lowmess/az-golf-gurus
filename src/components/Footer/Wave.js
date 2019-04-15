import React from 'react'
import { Box } from 'rebass'

const FlagAbove = props => (
  <Box css="position: relative; top: 2px;" {...props}>
    <svg viewBox="0 0 1024 61" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 1.017C455.576 149.516 624.494-53.627 1024 14.42v46.064H0V1.017z" />
    </svg>
  </Box>
)

export default FlagAbove
