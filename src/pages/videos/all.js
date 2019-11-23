import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Text } from 'rebass'
import { Rule } from '../../components/Typography'
import Container from '../../components/Container'
import Header from '../../components/Header'
import VideoPlaylistGrid from '../../components/VideoPlaylistGrid'
import { useSiteMetadata } from '../../utils/hooks'

const AllVideosPage = () => {
  const { allYouTubeVideo } = useStaticQuery(graphql`
    query {
      allYouTubeVideo {
        edges {
          node {
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
    }
  `)
  const { title: siteTitle } = useSiteMetadata()

  const videos = []

  for (const video of allYouTubeVideo.edges) {
    videos.push({
      videoId: video.node.videoId,
      title: video.node.title,
      description: video.node.description || null,
      thumbnail: video.node.localThumbnail.childImageSharp,
    })
  }

  return (
    <>
      <Helmet>
        <title>All Videos | {siteTitle}</title>
      </Helmet>

      <Header hideRule>
        <Header.Title>All Videos</Header.Title>
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
          <Link variant="ui-link" to="/videos/">
            View Video Playlists
          </Link>
        </Text>
      </Container>
    </>
  )
}

export default AllVideosPage
