import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'rebass'
import { Heading, Paragraph } from '../Typography'
import Container from '../Container'
import YouTubeVideo from '../YouTubeVideo'

const VideoPreviewTitle = ({ href, children, ...props }) => (
  <Heading className="video-title" mt={4} fontSize={2} {...props}>
    {children}
  </Heading>
)

VideoPreviewTitle.propTypes = {
  href: PropTypes.string,
  children: PropTypes.string.isRequired,
}

const VideoPreviewDescription = ({ children, ...props }) => (
  <Paragraph className="video-desc" mt={3} mx="auto" fontSize="1" {...props}>
    {children}
  </Paragraph>
)

VideoPreviewDescription.propTypes = {
  children: PropTypes.string.isRequired,
}

const VideoPreview = ({ video, paused, onClick, children, ...props }) => {
  const { videoId, title, thumbnail } = video

  return (
    <Card css="text-align: center" {...props}>
      <YouTubeVideo
        videoId={videoId}
        title={title}
        thumbnail={thumbnail}
        paused={paused}
        onClick={onClick}
      />
      <Container>{children}</Container>
    </Card>
  )
}

VideoPreview.propTypes = {
  video: PropTypes.shape({
    videoId: PropTypes.string.isRequired,
    title: PropTypes.string,
    thumbnail: PropTypes.shape({
      fluid: PropTypes.object.isRequired,
    }),
  }).isRequired,
  paused: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

VideoPreview.defaultProps = {
  paused: false,
}

export { VideoPreviewTitle, VideoPreviewDescription, VideoPreview }
