import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'
import { Text } from 'rebass'

const inputSharedStyles = css`
  display: block;
  width: 100%;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.grays[4]};
  border-radius: ${({ theme }) => theme.radii[1]};
  padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};

  &::placeholder {
    color: ${({ theme }) => theme.colors.grays[6]};
    opacity: 1;
  }
`

const Label = ({ children, ...props }) => (
  <Text
    as="label"
    fontSize={2}
    fontFamily="geomanist"
    fontWeight="medium"
    mb={2}
    css="display: block"
    {...props}
  >
    {children}
  </Text>
)

Label.propTypes = {
  children: PropTypes.node.isRequired,
}

const Input = props => <Text as="input" css={inputSharedStyles} {...props} />

const Textarea = props => {
  const styles = css`
    resize: vertical;
    ${inputSharedStyles}
  `

  return <Text as="textarea" rows="4" css={styles} {...props} />
}

export { Label, Input, Textarea }
