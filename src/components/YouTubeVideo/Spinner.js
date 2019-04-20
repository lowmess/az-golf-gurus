import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { Flex, Card } from 'rebass'

const Background = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
`

const Spinner = ({ videoSize, ...props }) => {
  const spinning = keyframes`
    from {
      transform: rotateZ(0deg)
    }
    to {
      transform: rotateZ(359deg)
    }
  `

  const Icon = styled(Card)`
    position: relative;
    width: ${({ theme }) =>
      videoSize > 480 ? theme.space[6] : theme.space[5]};
    height: ${({ theme }) =>
      videoSize > 480 ? theme.space[6] : theme.space[5]};
    margin: auto;
    border: ${({ theme }) =>
      videoSize > 480 ? theme.borders[4] : theme.borders[3]};
    border-left-color: transparent !important;
    animation: ${spinning} 1s linear infinite;
  `

  return (
    <Background {...props}>
      <Icon borderRadius="100%" />
    </Background>
  )
}

Spinner.propTypes = {
  videoSize: PropTypes.number.isRequired,
}

Spinner.defaultProps = {
  videoSize: 0,
}

export default Spinner
