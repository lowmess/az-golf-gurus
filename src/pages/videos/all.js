import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Text } from 'rebass'
import { Rule } from '../../components/Typography'
import Container from '../../components/Container'
import { Header, HeaderTitle } from '../../components/Header'
import VideoPlaylistGrid from '../../components/VideoPlaylistGrid'
import { themeHover } from '../../utils/styles'

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
      <Header hideRule>
        <HeaderTitle>All Videos</HeaderTitle>
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

export default AllVideosPage
