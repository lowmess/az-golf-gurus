import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Text } from 'rebass'
import HorizontalRule from '../components/HorizontalRule'
import Container from '../components/Container'
import Header from '../components/Header'
import VideoPlaylistGrid from '../components/VideoPlaylistGrid'
import { useSiteMetadata } from '../utils/hooks'
import unwidow from '../utils/unwidow'

const PlaylistTemplate = ({ data }) => {
  const { title: siteTitle } = useSiteMetadata()
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

  return (
    <>
      <Helmet>
        <title>
          {title} Videos | {siteTitle}
        </title>
      </Helmet>

      <Header hideRule>
        <Header.Title>{unwidow(title)}</Header.Title>

        {description && (
          <Header.Description>{unwidow(description)}</Header.Description>
        )}
      </Header>

      <Container mt={[4, 5]}>
        <VideoPlaylistGrid videos={videos} mb={5} />

        <HorizontalRule />

        <Text
          my={4}
          fontSize={[2, 3]}
          fontFamily="geomanist"
          textAlign="center"
        >
          <Link variant="ui-link" to="/videos/">
            View Video Playlists
          </Link>
        </Text>
      </Container>
    </>
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
