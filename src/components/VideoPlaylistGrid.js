import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { Box, Text } from 'rebass'
import { Heading, Paragraph } from './Typography'
import Container from './Container'
import YouTubeVideo from './YouTubeVideo'
import { useMediaQuery } from '../utils/hooks'
import unwidow from '../utils/unwidow'

const Grid = styled(Container)`
  position: relative;
  grid-row-gap: ${({ theme }) => theme.space[5]};
  grid-column-gap: ${({ theme }) => theme.space[4]};
  max-width: 60rem;

  & > * {
    width: 100vw;
    margin-right: calc(50% - 50vw);
    margin-left: calc(50% - 50vw);
  }

  & > * + * {
    margin-top: ${({ theme }) => theme.space[5]};
  }

  .video-title {
    font-size: ${({ theme }) => theme.fontSizes[3]};
  }

  .video-desc {
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    & > * {
      order: 2;
      width: 100%;
      margin-right: 0;
      margin-left: 0;
      margin-top: 0;
    }

    .video-title {
      font-size: ${({ theme }) => theme.fontSizes[2]};
    }

    .playing {
      grid-column: 1 / span 2;
      order: 1;

      .video-title {
        font-size: ${({ theme }) => theme.fontSizes[3]};
      }

      .video-desc {
        font-size: ${({ theme }) => theme.fontSizes[2]};
      }
    }
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: repeat(3, 1fr);

    .playing {
      grid-column: 1 / span 3;

      .video-title {
        font-size: ${({ theme }) => theme.fontSizes[4]};
      }
    }
  }
`

const VideoPlaylistGrid = ({ theme, videos, ...props }) => {
  const [activeId, setActiveId] = useState(videos[0].videoId)
  const playlistEl = useRef(null)
  const notMobile = useMediaQuery(`(min-width: ${theme.breakpoints[0]})`)

  const onPlay = () => {
    if (playlistEl.current && notMobile) playlistEl.current.scrollIntoView()
  }

  return (
    <Grid {...props}>
      <Box ref={playlistEl} css="position: absolute; top: -1rem;" />

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
  theme: PropTypes.object.isRequired,
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

export default withTheme(VideoPlaylistGrid)
