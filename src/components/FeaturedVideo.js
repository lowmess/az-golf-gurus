import React from 'react'
import PropTypes from 'prop-types'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { css, withTheme } from 'styled-components'
import { Box, Flex, Text, Button, Heading } from 'rebass'
import Container from './Container'
import YouTubeVideo from './YouTubeVideo'
import MarkdownContent from './MarkdownContent'
import { useMediaQuery } from '../utils/hooks'

const ViewAllButton = ({ children, ...props }) => (
  <Button as={Link} to="/videos/" variant="outline-small">
    {children || 'View All Videos'}
  </Button>
)

ViewAllButton.propTypes = {
  children: PropTypes.string,
}

const FeaturedVideo = ({ bg, theme, ...props }) => {
  const { contentfulHomePageVideo: data } = useStaticQuery(graphql`
    query {
      contentfulHomePageVideo(entryTitle: { ne: "SCHEMA__HomePageVideo" }) {
        videoId
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

  const description = data.videoDescription.content.html

  return (
    <Box css={styles} {...props}>
      <Container css="max-width: 60rem">
        <Flex
          flexDirection={['column', 'row']}
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Heading mr={[0, 4]} fontFamily="geomanist" fontWeight="medium">
            {data.videoTitle || 'Featured Video'}
          </Heading>

          {!isMobile && (
            <div>
              <ViewAllButton />
            </div>
          )}
        </Flex>

        <YouTubeVideo videoId={data.videoId} />

        {description && (
          <MarkdownContent
            mt={4}
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
  bg: PropTypes.string,
  theme: PropTypes.object.isRequired,
}

export default withTheme(FeaturedVideo)
