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

const FeaturedVideo = ({ video, bg, theme, ...props }) => {
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

  const styles = css`
    ${bg && `background-image: linear-gradient(to bottom, ${bg}, transparent)`};
  `

  const title = data.videoTitle || video.title
  const description =
    data.videoDescription && data.videoDescription.content.html

  return (
    <Box css={styles} {...props}>
      <Container maxWidth="60rem">
        <Flex
          flexDirection={['column', 'row']}
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Heading mr={[0, 4]} fontFamily="geomanist" fontWeight="medium">
            {unwidow(title)}
          </Heading>

          {!isMobile && (
            <div>
              <ViewAllButton />
            </div>
          )}
        </Flex>

        <YouTubeVideo
          title={title}
          videoId={video.videoId}
          thumbnail={video.localThumbnail.childImageSharp}
        />

        {description && (
          <MarkdownContent
            mt={[4, 5]}
            fontSize={[2, 3]}
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
  theme: PropTypes.object.isRequired,
}

export default withTheme(FeaturedVideo)
