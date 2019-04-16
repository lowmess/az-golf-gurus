import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { css } from 'styled-components'
import { Text } from 'rebass'
import { Heading, Rule, Separator } from '../../components/Typography'
import Container from '../../components/Container'
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

  const separatorStyles = css`
    display: none;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      display: block;
    }
  `

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
    <Container>
      <Text textAlign="center" pt={5}>
        <Heading as="h1" fontSize={[4, 5]} fontWeight={['medium', 'bold']}>
          All Videos
        </Heading>
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

export default AllVideosPage
