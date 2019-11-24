import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'rebass'

const HorizontalRule = ({ sx, ...props }) => (
  <Box
    as="hr"
    sx={{
      height: '1px',
      margin: 0,
      border: 0,
      backgroundColor: 'green',
      ...sx,
    }}
    {...props}
  />
)

HorizontalRule.propTypes = {
  sx: PropTypes.object,
}

export default HorizontalRule
