import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import { css } from 'styled-components'
import { Text } from 'rebass'
import { Heading, Paragraph, Rule, Separator } from '../components/Typography'
import Container from '../components/Container'
import VideoPlaylistGrid from '../components/VideoPlaylistGrid'
import { themeHover } from '../utils/styles'
import unwidow from '../utils/unwidow'

const PlaylistTemplate = ({ data }) => {
  const { title, description, videos: playlistVideos } = data.youTubePlaylist

  const videos = []

  for (const video of playlistVideos) {
    videos.push({
      videoId: video.videoId,
      title: video.title,
      description: video.description || null,
      thumbnail: video.localThumbnail.childImageSharp,
    })
  }

  const separatorStyles = css`
    display: none;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      display: block;
    }
  `

  return (
    <Container>
      <Text textAlign="center" pt={5}>
        <Heading as="h1" fontSize={[4, 5]} fontWeight={['medium', 'bold']}>
          {unwidow(title)}
        </Heading>

        {description && (
          <Paragraph mt={4} fontSize={[1, 2]}>
            {unwidow(description)}
          </Paragraph>
        )}
      </Text>

      <Separator mt={4} mx="auto" css={separatorStyles} />

      <VideoPlaylistGrid videos={videos} mt={[5, 6]} mb={5} />

      <Rule />

      <Text my={4} fontSize={[2, 3]} fontFamily="geomanist" textAlign="center">
        <Link to="/videos/" css={themeHover}>
          View Video Playlists
        </Link>
      </Text>
    </Container>
  )
}

PlaylistTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query PlaylistBySlug($slug: String!) {
    youTubePlaylist(slug: { eq: $slug }) {
      playlistId
      title
      description

      videos {
        videoId
        title
        description

        localThumbnail {
          childImageSharp {
            fluid(maxWidth: 960) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default PlaylistTemplate
