import React from 'react'
import PropTypes from 'prop-types'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { css, withTheme } from 'styled-components'
import { Box, Flex, Text, Button } from 'rebass'
import { Heading } from './Typography'
import Container from './Container'
import YouTubeVideo from './YouTubeVideo'
import MarkdownContent from './MarkdownContent'
import { useMediaQuery } from '../utils/hooks'
import unwidow from '../utils/unwidow'

const ViewAllButton = ({ children, ...props }) => (
  <Button as={Link} to="/videos/" variant="outline-small">
    {children || 'View All Videos'}
  </Button>
)

ViewAllButton.propTypes = {
  children: PropTypes.string,
}

const FeaturedVideo = ({ theme, video, bg, ...props }) => {
  const { contentfulHomePageVideo: data } = useStaticQuery(graphql`
    query {
      contentfulHomePageVideo(entryTitle: { ne: "SCHEMA__HomePageVideo" }) {
        videoTitle
        videoDescription {
          content: childMarkdownRemark {
            html
          }
        }
        viewAllButtonLabel
      }
    }
  `)

  const isMobile = !useMediaQuery(`(min-width: ${theme.breakpoints[0]})`)

  const bgStyles = css`
    ${bg && `background-image: linear-gradient(to bottom, ${bg}, transparent)`};
  `

  const videoStyles = css`
    width: 100vw;
    margin-right: calc(50% - 50vw);
    margin-left: calc(50% - 50vw);

    @media (min-width: ${theme.breakpoints[0]}) {
      width: 100%;
      margin-right: 0;
      margin-left: 0;
    }
  `

  const title = data.videoTitle || video.title
  const description =
    data.videoDescription && data.videoDescription.content.html

  return (
    <Box css={bgStyles} {...props}>
      <Container maxWidth="60rem">
        {!isMobile && (
          <Flex
            flexDirection={['column', 'row']}
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Heading>{unwidow(title)}</Heading>

            <div>
              <ViewAllButton />
            </div>
          </Flex>
        )}

        <YouTubeVideo
          title={title}
          videoId={video.videoId}
          thumbnail={video.localThumbnail.childImageSharp}
          css={videoStyles}
        />

        {isMobile && (
          <Heading mt={4} fontSize="3" textAlign="center">
            {unwidow(title)}
          </Heading>
        )}

        {description && (
          <MarkdownContent
            mt={[2, 5]}
            fontSize={[1, 3]}
            center
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {isMobile && (
          <Text mt={4} textAlign="center">
            <ViewAllButton variant="outline-small" />
          </Text>
        )}
      </Container>
    </Box>
  )
}

FeaturedVideo.propTypes = {
  theme: PropTypes.object.isRequired,
  video: PropTypes.shape({
    videoId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    localThumbnail: PropTypes.object.isRequired,
  }),
  bg: PropTypes.string,
}

export default withTheme(FeaturedVideo)
