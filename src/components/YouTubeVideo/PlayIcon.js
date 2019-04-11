import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'
import { Flex, Card } from 'rebass'

const PlayIcon = ({ title, ...props }) => {
  const bgStyles = css`
    background-color: rgba(0, 0, 0, 0.33);
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
      background-color: rgba(0, 0, 0, 0.1);
    }
  `

  const iconStyles = css`
    display: flex;
    position: relative;
    width: ${({ theme }) => theme.space[5]};
    height: ${({ theme }) => theme.space[5]};
    margin: auto;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      width: ${({ theme }) => theme.space[6]};
      height: ${({ theme }) => theme.space[6]};
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
      <Card borderRadius="100%" border={2} css={iconStyles}>
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
}

export default PlayIcon
