import React from 'react'
import PropTypes from 'prop-types'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Box, Flex, Text, Button } from 'rebass'
import Container from '../../components/Container'
import { Header, HeaderTitle, HeaderDescription } from '../../components/Header'
import { Heading, Paragraph, Rule } from '../../components/Typography'
import { themeHover } from '../../utils/styles'
import unwidow from '../../utils/unwidow'

const PlaylistText = styled(Text)`
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    text-align: ${({ shouldFlip }) => (shouldFlip ? 'right' : 'left')};
  }
`

const PlaylistImage = styled(Img)`
  width: 100vw;
  margin-right: calc(50vw - 50%);
  margin-left: calc(50vw - 50%);

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    order: ${({ shouldFlip }) => (shouldFlip ? 1 : 0)};
    width: 50%;
    margin-right: ${({ theme, shouldFlip }) =>
      shouldFlip ? 0 : theme.space[4]};
    margin-left: ${({ theme, shouldFlip }) =>
      shouldFlip ? theme.space[4] : 0};
  }
`

const PlaylistPreview = ({ playlist, index, ...props }) => {
  const { playlistId, title, description, slug, localThumbnail } = playlist

  const shouldFlip = index % 2 !== 0

  return (
    <Flex
      key={playlistId}
      flexDirection={['column', 'row']}
      alignItems="center"
      my={5}
    >
      <PlaylistImage
        shouldFlip={shouldFlip}
        fluid={localThumbnail.childImageSharp.fluid}
      />

      <PlaylistText shouldFlip={shouldFlip} flex="1" mt={[4, 0]}>
        <Heading mb={3} fontSize={3}>
          <Link to={slug} css={themeHover}>
            {unwidow(title)}
          </Link>
        </Heading>

        {description && (
          <Paragraph mb={2} fontSize={1}>
            {unwidow(description)}
          </Paragraph>
        )}

        <Button variant="outline-small" as={Link} to={slug} mt={2} fontSize={0}>
          View Playlist
        </Button>
      </PlaylistText>
    </Flex>
  )
}

PlaylistPreview.propTypes = {
  playlist: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

const VideosPage = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulVideosPage(title: { ne: "SCHEMA__VideosPage" }) {
        title
        description {
          content: childMarkdownRemark {
            html
          }
        }
      }

      allYouTubePlaylist {
        edges {
          node {
            playlistId
            slug
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

  const pageTitle =
    (data.contentfulVideosPage && data.contentfulVideosPage.title) || 'Videos'

  const hasDescription =
    data.contentfulVideosPage && data.contentfulVideosPage.description

  const playlists = data.allYouTubePlaylist.edges

  return (
    <>
      <Header hideRule>
        <HeaderTitle>{pageTitle}</HeaderTitle>

        {hasDescription && (
          <HeaderDescription markdown>
            {data.contentfulVideosPage.description.content.html}
          </HeaderDescription>
        )}
      </Header>

      <Container mt={[4, 5]}>
        <Box>
          {playlists.map((playlist, index) => (
            <PlaylistPreview
              key={playlist.node.playlistId}
              playlist={playlist.node}
              index={index}
            />
          ))}
        </Box>

        <Rule />

        <Text
          my={4}
          fontSize={[2, 3]}
          fontFamily="geomanist"
          textAlign="center"
        >
          <Link to="/videos/all" css={themeHover}>
            View All Videos
          </Link>
        </Text>
      </Container>
    </>
  )
}

export default VideosPage
