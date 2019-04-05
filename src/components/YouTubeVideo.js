import React from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import { AspectRatio, AspectRatioChild } from './AspectRatio'

const YouTubeVideo = ({ videoId, ...props }) => {
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

  return (
    <AspectRatio ratio="16:9" {...props}>
      <AspectRatioChild as={YouTube} videoId={videoId} opts={options} />
    </AspectRatio>
  )
}

YouTubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
}

export default YouTubeVideo
