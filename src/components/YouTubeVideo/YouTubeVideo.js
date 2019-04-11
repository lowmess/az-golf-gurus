import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import YouTube from 'react-youtube'
import { css } from 'styled-components'
import { Flex } from 'rebass'
import ResponsiveEmbed from './ResponsiveEmbed'
import PlayIcon from './PlayIcon'

const YouTubeVideo = ({ title, videoId, thumbnail, ...props }) => {
  const [played, setPlayed] = useState(false)
  const [player, setPlayer] = useState(null)

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
    opacity: ${played ? 0 : 1};
    pointer-events: ${played ? 'none' : 'auto'};
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

  const onReady = event => {
    setPlayer(event.target)
  }

  const handleVideoInteraction = event => {
    setPlayed(true)

    if (player) {
      const focusElement =
        player.getIframe().contentDocument || player.getIframe().contentWindow
      focusElement.focus()
      player.playVideo()
    }
  }

  const handleFocus = event => {
    setPlayed(true)

    if (player) {
      const focusElement =
        player.getIframe().contentDocument || player.getIframe().contentWindow
      focusElement.focus()
    }
  }

  const handleKeyDown = event => {
    if (
      event.key === 'Enter' ||
      event.key === 'Spacebar' ||
      event.key === ' '
    ) {
      handleVideoInteraction()
    }
  }

  return (
    <ResponsiveEmbed css={containerStyles} ratio="16:9" {...props}>
      {thumbnail && (
        <Flex
          css={imageStyles}
          role="button"
          tabIndex={played ? -1 : 0}
          onClick={handleVideoInteraction}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          aria-hidden
        >
          <PlayIcon title={title} m="auto" color="white" />

          <Img
            fadeIn={true}
            src={thumbnail.fluid.src}
            sizes={thumbnail.fluid}
          />
        </Flex>
      )}

      <YouTube
        videoId={videoId}
        opts={options}
        paused={!played}
        onReady={onReady}
        onFocus={handleVideoInteraction}
        onPlay={handleVideoInteraction}
      />
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
