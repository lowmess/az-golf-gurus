import React from 'react'
import PropTypes from 'prop-types'
import { css, keyframes } from 'styled-components'
import { Flex, Card } from 'rebass'

const PlayIcon = ({ title, ...props }) => {
  const bgStyles = css`
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

  const spinning = keyframes`
    from {
      transform: rotateZ(0deg)
    }
    to {
      transform: rotateZ(359deg)
    }
  `

  const spinnerStyles = css`
    position: relative;
    width: ${({ theme }) => theme.space[5]};
    height: ${({ theme }) => theme.space[5]};
    margin: auto;
    border-left-color: transparent !important;
    animation: ${spinning} 1s linear infinite;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      width: ${({ theme }) => theme.space[6]};
      height: ${({ theme }) => theme.space[6]};
    }
  `

  return (
    <Flex css={bgStyles} {...props}>
      <Card borderRadius="100%" border={[2, 3]} css={spinnerStyles} />
    </Flex>
  )
}

PlayIcon.propTypes = {
  title: PropTypes.string.isRequired,
}

export default PlayIcon
