import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Text } from 'rebass'
import { Rule } from '../components/Typography'
import Container from '../components/Container'
import { Header, HeaderTitle, HeaderDescription } from '../components/Header'
import VideoPlaylistGrid from '../components/VideoPlaylistGrid'
import { useSiteMetadata } from '../utils/hooks'
import { themeHover } from '../utils/styles'
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
        <HeaderTitle>{unwidow(title)}</HeaderTitle>

        {description && (
          <HeaderDescription>{unwidow(description)}</HeaderDescription>
        )}
      </Header>

      <Container mt={[4, 5]}>
        <VideoPlaylistGrid videos={videos} mb={5} />

        <Rule />

        <Text
          my={4}
          fontSize={[2, 3]}
          fontFamily="geomanist"
          textAlign="center"
        >
          <Link to="/videos/" css={themeHover}>
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
