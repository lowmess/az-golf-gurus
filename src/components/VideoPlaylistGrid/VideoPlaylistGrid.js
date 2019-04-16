import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { css, withTheme } from 'styled-components'
import { Box } from 'rebass'
import Container from '../Container'
import {
  VideoPreview,
  VideoPreviewTitle,
  VideoPreviewDescription,
} from './VideoPreview'
import { useMediaQuery } from '../../utils/hooks'
import unwidow from '../../utils/unwidow'

const Grid = ({ children, ...props }) => {
  const gridStyles = css`
    position: relative;
    display: grid;
    grid-row-gap: ${({ theme }) => theme.space[5]};
    grid-column-gap: ${({ theme }) => theme.space[4]};
    max-width: 60rem;

    .video-title {
      font-size: ${({ theme }) => theme.fontSizes[2]};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      grid-template-columns: repeat(2, 1fr);

      & > * {
        order: 2;
      }

      .playing {
        grid-column: 1 / span 2;
        order: 1;

        .video-title {
          font-size: ${({ theme }) => theme.fontSizes[3]};
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

  return (
    <Container css={gridStyles} {...props}>
      {children}
    </Container>
  )
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
}

const VideoPlaylistGrid = ({ theme, videos, ...props }) => {
  const [activeId, setActiveId] = useState(videos[0].videoId)
  const playlistEl = useRef(null)
  const notMobile = useMediaQuery(`(min-width: ${theme.breakpoints[0]})`)

  const onClick = videoId => {
    setActiveId(videoId)

    if (playlistEl.current && notMobile) playlistEl.current.scrollIntoView()
  }

  return (
    <Grid theme={theme} {...props}>
      <Box ref={playlistEl} css="position: absolute; top: -1rem;" />

      {videos.map(video => (
        <VideoPreview
          key={video.videoId}
          video={video}
          className={activeId === video.videoId ? 'playing' : ''}
          paused={activeId !== video.videoId}
          onClick={onClick}
        >
          <VideoPreviewTitle>{unwidow(video.title)}</VideoPreviewTitle>

          {video.description && (
            <VideoPreviewDescription>
              {unwidow(video.description)}
            </VideoPreviewDescription>
          )}
        </VideoPreview>
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
