import React from 'react'
import PropTypes from 'prop-types'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from 'styled-components'
import { Box, Flex, Text, Button } from 'rebass'
import Container from '../../components/Container'
import MarkdownContent from '../../components/MarkdownContent'
import { Heading, Paragraph, Rule } from '../../components/Typography'
import { themeHover } from '../../utils/styles'
import unwidow from '../../utils/unwidow'

const PlaylistPreview = ({ playlist, index, ...props }) => {
  const { playlistId, title, description, slug, localThumbnail } = playlist

  const shouldFlip = index % 2 !== 0

  const imageStyles = css`
    width: 100vw;
    margin-right: calc(50vw - 50%);
    margin-left: calc(50vw - 50%);

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      order: ${shouldFlip ? 1 : 0};
      width: 50%;
      margin-right: ${({ theme }) => (shouldFlip ? 0 : theme.space[4])};
      margin-left: ${({ theme }) => (shouldFlip ? theme.space[4] : 0)};
    }
  `

  const textStyles = css`
    text-align: center;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      text-align: ${shouldFlip ? 'right' : 'left'};
    }
  `

  return (
    <Flex
      key={playlistId}
      flexDirection={['column', 'row']}
      alignItems="center"
      my={5}
    >
      <Box
        as={Img}
        fluid={localThumbnail.childImageSharp.fluid}
        css={imageStyles}
      />

      <Text flex="1" mt={[4, 0]} css={textStyles}>
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
      </Text>
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
      contentfulVideosPage(entryTitle: { ne: "SCHEMA__VideosPage" }) {
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

  const ruleStyles = css`
    display: none;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      display: block;
    }
  `

  return (
    <Container>
      <Text textAlign="center" pt={5}>
        <Heading as="h1" fontSize={[4, 5]} fontWeight={['medium', 'bold']}>
          {pageTitle}
        </Heading>

        {hasDescription && (
          <MarkdownContent
            mt={4}
            fontSize={[1, 2]}
            center
            dangerouslySetInnerHTML={{
              __html: data.contentfulVideosPage.description.content.html,
            }}
          />
        )}
      </Text>

      <Rule mt={4} mb={6} mx="auto" css={ruleStyles} />

      {playlists.map((playlist, index) => (
        <PlaylistPreview
          key={playlist.node.playlistId}
          playlist={playlist.node}
          index={index}
        />
      ))}
    </Container>
  )
}

export default VideosPage
