import React from 'react'
import PropTypes from 'prop-types'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { useTheme } from 'emotion-theming'
import { rgba } from 'polished'
import { Box, Flex, Text, Heading, Button } from 'rebass'
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

const FeaturedVideo = ({ video, bg, sx, ...props }) => {
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
  const theme = useTheme()
  const isMobile = !useMediaQuery(`(min-width: ${theme.breakpoints[0]})`)

  const title = data.videoTitle || video.title
  const description =
    data.videoDescription && data.videoDescription.content.html

  return (
    <Box
      sx={{
        backgroundImage: bg
          ? `linear-gradient(to bottom, ${bg}, ${rgba(bg, 0)})`
          : null,
        ...sx,
      }}
      {...props}
    >
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
          sx={{
            width: ['100vw', '100%'],
            marginRight: ['calc(50% - 50vw)', 0],
            marginLeft: ['calc(50% - 50vw)', 0],
          }}
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
  video: PropTypes.shape({
    videoId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    localThumbnail: PropTypes.object.isRequired,
  }),
  bg: PropTypes.string,
  sx: PropTypes.object,
}

export default FeaturedVideo
