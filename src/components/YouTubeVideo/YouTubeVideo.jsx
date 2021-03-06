import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import YouTube from 'react-youtube'
import { Flex } from 'rebass'
import { useWindowSize } from '../../utils/hooks'
import ResponsiveEmbed from './ResponsiveEmbed'
import PlayIcon from './PlayIcon'
import Spinner from './Spinner'

const videoContainerStyles = {
  '&:focus-within': {
    outline: '-webkit-focus-ring-color auto 5px',
  },
}

const thumbnailContainerStyles = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  color: 'white',
  opacity: 1,
  pointerEvents: 'auto',
  transiiton: 'opacity 0.3s ease',

  '.gatsby-image-wrapper': {
    position: 'absolute !important',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },

  '&.is-ready': {
    opacity: 0,
    pointerEvents: 'none',
  },
}

const YouTubeVideo = ({
  title,
  videoId,
  thumbnail,
  paused,
  onPlay,
  setActiveId,
  sx,
  ...props
}) => {
  const [played, setPlayed] = useState(false)
  const [ready, setReady] = useState(false)
  const [videoPlayer, setVideoPlayer] = useState(null)
  const [videoSize, setVideoSize] = useState(0)
  const { width } = useWindowSize()
  const playerEl = useRef(null)

  useEffect(() => {
    if (paused && videoPlayer) {
      videoPlayer.pauseVideo()
    }

    if (playerEl.current) {
      setVideoSize(playerEl.current.getBoundingClientRect().width)
    }
  }, [paused, videoPlayer, playerEl, width])

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

  const handlePlay = event => {
    if (setActiveId) setActiveId(videoId)
    if (onPlay) onPlay()
  }

  const onVideoReady = event => {
    const player = event.target
    const focusElement =
      player.getIframe().contentDocument || player.getIframe().contentWindow

    handlePlay()

    player.playVideo()
    focusElement.focus()

    setReady(true)
    setVideoPlayer(player)
  }

  return (
    <ResponsiveEmbed
      ratio="16:9"
      className="youtube-video"
      sx={{
        ...videoContainerStyles,
        ...sx,
      }}
      {...props}
    >
      {thumbnail && (
        <Flex
          ready={ready}
          role="button"
          tabIndex={played ? -1 : 0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-hidden
          className={ready ? 'is-ready' : null}
          sx={thumbnailContainerStyles}
          ref={playerEl}
        >
          {!played && <PlayIcon videoSize={videoSize} title={title} />}

          {played && <Spinner videoSize={videoSize} />}

          <Img fluid={thumbnail.fluid} />
        </Flex>
      )}

      {(played || !thumbnail) && (
        <YouTube
          videoId={videoId}
          opts={options}
          onReady={onVideoReady}
          onPlay={handlePlay}
        />
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
  paused: PropTypes.bool.isRequired,
  onPlay: PropTypes.func,
  setActiveId: PropTypes.func,
  sx: PropTypes.object,
}

YouTubeVideo.defaultProps = {
  paused: false,
}

export default YouTubeVideo
