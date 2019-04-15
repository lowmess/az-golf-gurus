import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import YouTube from 'react-youtube'
import { css } from 'styled-components'
import { Flex } from 'rebass'
import ResponsiveEmbed from './ResponsiveEmbed'
import PlayIcon from './PlayIcon'
import Spinner from './Spinner'

const YouTubeVideo = ({ title, videoId, thumbnail, ...props }) => {
  const [played, setPlayed] = useState(false)
  const [ready, setReady] = useState(false)

  const options = {
    width: '960',
    height: '540',
    playerVars: {
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showInfo: 0,
    },
  }

  const containerStyles = css`
    &:focus-within {
      outline: -webkit-focus-ring-color auto 5px;
    }
  `

  const imageStyles = css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    opacity: ${ready ? 0 : 1};
    pointer-events: ${ready ? 'none' : 'auto'};
    transition: opacity 0.3s ease;

    &:focus {
      border-radius: 100%;
    }

    .gatsby-image-wrapper {
      position: absolute !important;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  `

  const onVideoReady = event => {
    const player = event.target
    const focusElement =
      player.getIframe().contentDocument || player.getIframe().contentWindow

    player.playVideo()
    focusElement.focus()

    setReady(true)
  }

  const handleClick = event => {
    setPlayed(true)
  }

  const handleKeyDown = event => {
    if (
      event.key === 'Enter' ||
      event.key === 'Spacebar' ||
      event.key === ' '
    ) {
      setPlayed(true)
    }
  }

  return (
    <ResponsiveEmbed css={containerStyles} ratio="16:9" {...props}>
      {thumbnail && (
        <Flex
          css={imageStyles}
          role="button"
          tabIndex={played ? -1 : 0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-hidden
          color="white"
        >
          {!played && <PlayIcon title={title} />}

          {played && <Spinner />}

          <Img fluid={thumbnail.fluid} />
        </Flex>
      )}

      {(played || !thumbnail) && (
        <YouTube videoId={videoId} opts={options} onReady={onVideoReady} />
      )}
    </ResponsiveEmbed>
  )
}

YouTubeVideo.propTypes = {
  title: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({
    fluid: PropTypes.object.isRequired,
  }),
}

export default YouTubeVideo
