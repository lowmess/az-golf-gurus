import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useTheme } from 'emotion-theming'
import { Box, Text, Heading } from 'rebass'
import { useMediaQuery } from '../utils/hooks'
import unwidow from '../utils/unwidow'
import Paragraph from './Paragraph'
import Container from './Container'
import YouTubeVideo from './YouTubeVideo'

// Leaving this a styled cause of selector complication
const Grid = ({ sx, children, ...props }) => (
  <Container
    sx={{
      display: [null, 'grid'],
      position: 'relative',
      gridTemplateColumns: [null, 'repeat(2, 1fr)', 'repeat(3, 1fr)'],
      gridRowGap: [null, theme => theme.space[5]],
      gridColumnGap: [null, theme => theme.space[4]],
      maxWidth: '60rem',

      '& > *': {
        order: [null, 2],
        width: ['100vw', '100%'],
        marginTop: [null, 0],
        // `!important` is to override Box default `margin: 0`. kind of annoying
        marginX: ['calc(50% - 50vw) !important', '0 !important'],
      },

      '& > * + *': {
        marginTop: 5,
      },

      '.video-title': {
        fontSize: [3, 2],
      },

      '.video-desc': {
        fontSize: 1,
      },

      '.playing': {
        gridColumn: [null, '1 / span 2', '1 / span 3'],
        order: [null, 1],

        '.video-title': {
          fontSize: [null, 3, 4],
        },

        '.video-desc': {
          fontSize: [null, 2],
        },
      },

      ...sx,
    }}
    {...props}
  >
    {children}
  </Container>
)

Grid.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
}

const VideoPlaylistGrid = ({ videos, ...props }) => {
  const [activeId, setActiveId] = useState(videos[0].videoId)
  const playlistEl = useRef(null)
  const theme = useTheme()
  const notMobile = useMediaQuery(`(min-width: ${theme.breakpoints[0]})`)

  const onPlay = () => {
    if (playlistEl.current && notMobile) playlistEl.current.scrollIntoView()
  }

  return (
    <Grid {...props}>
      <Box ref={playlistEl} sx={{ position: 'absolute', top: '-3' }} />

      {videos.map(video => (
        <Text
          key={video.videoId}
          className={activeId === video.videoId ? 'playing' : ''}
          textAlign="center"
        >
          <YouTubeVideo
            videoId={video.videoId}
            title={video.title}
            thumbnail={video.thumbnail}
            paused={activeId !== video.videoId}
            onPlay={onPlay}
            setActiveId={setActiveId}
            mediaQuery={notMobile}
          />

          <Container>
            <Heading className="video-title" mt={4} fontSize={2}>
              {unwidow(video.title)}
            </Heading>

            {video.description && (
              <Paragraph className="video-desc" mt={2} mx="auto" fontSize="1">
                {unwidow(video.description)}
              </Paragraph>
            )}
          </Container>
        </Text>
      ))}
    </Grid>
  )
}

VideoPlaylistGrid.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      videoId: PropTypes.string.isRequired,
      title: PropTypes.string,
      thumbnail: PropTypes.shape({
        fluid: PropTypes.object.isRequired,
      }),
    }).isRequired
  ).isRequired,
}

export default VideoPlaylistGrid
