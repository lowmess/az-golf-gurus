import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import YouTube from 'react-youtube'
import styled from 'styled-components'
import { Flex } from 'rebass'
import ResponsiveEmbed from './ResponsiveEmbed'
import PlayIcon from './PlayIcon'
import Spinner from './Spinner'
import { useWindowSize } from '../../utils/hooks'

const VideoContainer = styled(ResponsiveEmbed)`
  &:focus-within {
    outline: -webkit-focus-ring-color auto 5px;
  }
`

const ThumbnailContainer = styled(Flex)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  opacity: ${({ ready }) => (ready ? 0 : 1)};
  pointer-events: ${({ ready }) => (ready ? 'none' : 'auto')};
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

const YouTubeVideo = ({
  title,
  videoId,
  thumbnail,
  paused,
  onPlay,
  setActiveId,
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
    <VideoContainer className="youtube-video" ratio="16:9" {...props}>
      {thumbnail && (
        <ThumbnailContainer
          ready={ready}
          role="button"
          tabIndex={played ? -1 : 0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-hidden
          color="white"
          ref={playerEl}
        >
          {!played && <PlayIcon videoSize={videoSize} title={title} />}

          {played && <Spinner videoSize={videoSize} />}

          <Img fluid={thumbnail.fluid} />
        </ThumbnailContainer>
      )}

      {(played || !thumbnail) && (
        <YouTube
          videoId={videoId}
          opts={options}
          onReady={onVideoReady}
          onPlay={handlePlay}
        />
      )}
    </VideoContainer>
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
}

YouTubeVideo.defaultProps = {
  paused: false,
}

export default YouTubeVideo
