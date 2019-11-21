import React from 'react'
import PropTypes from 'prop-types'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import { Box, Flex, Text, Heading, Button } from 'rebass'
import Container from '../../components/Container'
import { Header, HeaderTitle, HeaderDescription } from '../../components/Header'
import { Paragraph, Rule } from '../../components/Typography'
import { useSiteMetadata } from '../../utils/hooks'
import unwidow from '../../utils/unwidow'

const PlaylistText = ({ shouldFlip, sx, children, ...props }) => (
  <Text
    sx={{
      textAlign: ['center', shouldFlip ? 'right' : 'left'],
      ...sx,
    }}
    {...props}
  >
    {children}
  </Text>
)

PlaylistText.propTypes = {
  shouldFlip: PropTypes.bool,
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
}

const PlaylistImage = ({ shouldFlip, sx, ...props }) => (
  <Box
    as={Img}
    sx={{
      order: [null, shouldFlip ? 1 : 0],
      width: ['100vw', '50%'],
      marginRight: ['calc(50vw - 50%)', shouldFlip ? 0 : 4],
      marginLeft: ['calc(50vw - 50%)', shouldFlip ? 4 : 0],
      ...sx,
    }}
    {...props}
  />
)

PlaylistImage.propTypes = {
  shouldFlip: PropTypes.bool,
  sx: PropTypes.object,
}

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
          <Link variant="ui-link" to={slug}>
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
  const { title: siteTitle } = useSiteMetadata()

  const pageTitle =
    (data.contentfulVideosPage && data.contentfulVideosPage.title) || 'Videos'

  const hasDescription =
    data.contentfulVideosPage && data.contentfulVideosPage.description

  const playlists = data.allYouTubePlaylist.edges

  return (
    <>
      <Helmet>
        <title>
          {pageTitle} | {siteTitle}
        </title>
      </Helmet>

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
          <Link variant="ui-link" to="/videos/all">
            View All Videos
          </Link>
        </Text>
      </Container>
    </>
  )
}

export default VideosPage
