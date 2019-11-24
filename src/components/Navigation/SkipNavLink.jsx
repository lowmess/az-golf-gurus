import React from 'react'
import { Link } from 'rebass'

const SkipNavLink = () => (
  <Link
    href="#main-content"
    sx={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 3,
      backgroundColor: 'white',
      fontFamily: 'geomanist',
      opacity: 0,
      pointerEvents: 'none',
      transition: 'opacity 0.3s ease',

      '&:focus': {
        pointerEvents: 'auto',
        opacity: 1,
      },

      '&:hover': {
        color: 'green',
      },
    }}
  >
    Skip to main content
  </Link>
)

export default SkipNavLink
