import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'
import { Flex, Card } from 'rebass'

const PlayIcon = ({ title, videoSize, ...props }) => {
  const bgStyles = css`
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

  const iconStyles = css`
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
    <Flex css={bgStyles} {...props}>
      <Card borderRadius="100%" css={iconStyles}>
        <title>Play &ldquo;{title}&rdquo; video</title>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 32 32"
        >
          <path d="M4 4l24 12L4 28z" />
        </svg>
      </Card>
    </Flex>
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
