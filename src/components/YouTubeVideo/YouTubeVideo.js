import React from 'react'
import PropTypes from 'prop-types'
import YouTube from 'react-youtube'
import ResponsiveEmbed from './ResponsiveEmbed'

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
    <ResponsiveEmbed ratio="16:9" {...props}>
      <YouTube videoId={videoId} opts={options} />
    </ResponsiveEmbed>
  )
}

YouTubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
}

export default YouTubeVideo
