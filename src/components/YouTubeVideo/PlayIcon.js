import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.25);
  }
`

const PlayIcon = ({ title, videoSize, ...props }) => {
  const Icon = styled(Card)`
    display: flex;
    position: relative;
    width: ${({ theme }) =>
      videoSize > 480 ? theme.space[6] : theme.space[5]};
    height: ${({ theme }) =>
      videoSize > 480 ? theme.space[6] : theme.space[5]};
    margin: auto;
    border: ${({ theme }) =>
      videoSize > 480 ? theme.borders[4] : theme.borders[3]};
    background-color: rgba(0, 0, 0, 0.5);
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }

    svg {
      position: relative;
      left: 7.5%;
      width: calc(100% / 1.5);
      height: calc(100% / 1.5);
      margin: auto;
    }
  `

  return (
    <Background {...props}>
      <Icon borderRadius="100%">
        <title>Play &ldquo;{title}&rdquo; video</title>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 32 32"
        >
          <path d="M4 4l24 12L4 28z" />
        </svg>
      </Icon>
    </Background>
  )
}

PlayIcon.propTypes = {
  title: PropTypes.string.isRequired,
  videoSize: PropTypes.number.isRequired,
}

PlayIcon.defaultProps = {
  videoSize: 0,
}

export default PlayIcon
