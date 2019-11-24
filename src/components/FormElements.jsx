import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

const inputSharedStyles = {
  display: 'block',
  width: '100%',
  border: 1,
  borderColor: 'grays.4',
  borderRadius: 1,
  paddingY: 2,
  paddingX: 3,

  '&::placeholder': {
    color: 'grays.6',
    opacity: 1,
  },
}

const Label = ({ sx, children, ...props }) => (
  <Text
    as="label"
    sx={{
      display: 'block',
      marginBottom: 2,
      fontSize: 2,
      fontFamily: 'geomanist',
      fontWeight: 'medium',
      ...sx,
    }}
    {...props}
  >
    {children}
  </Text>
)

Label.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
}

const Input = ({ sx, ...props }) => (
  <Text as="input" sx={{ ...inputSharedStyles, ...sx }} {...props} />
)

Input.propTypes = {
  sx: PropTypes.object,
}

const Textarea = ({ sx, ...props }) => (
  <Text
    as="textarea"
    rows="4"
    sx={{
      resize: 'vertical',
      ...inputSharedStyles,
      ...sx,
    }}
    {...props}
  />
)

Textarea.propTypes = {
  sx: PropTypes.object,
}

export { Label, Input, Textarea }
