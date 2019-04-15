import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { withTheme } from 'styled-components'
import Container from '../components/Container'
import { Heading, Separator } from '../components/Typography'
import MarkdownContent from '../components/MarkdownContent'
import Hero from '../components/Hero'
import FeaturedVideo from '../components/FeaturedVideo'
import ContactForm from '../components/ContactForm'
import unwidow from '../utils/unwidow'

const HomePage = ({ data, theme }) => {
  const contentfulData = data.contentfulHomePageContact || {}
  const title = contentfulData.title || 'Get in Touch'
  const hasIntro = contentfulData && contentfulData.introText

  const bg = theme.colors.greens[0]

  return (
    <>
      <Hero bg={bg} />

      <FeaturedVideo
        video={data.youTubeVideo ? data.youTubeVideo : undefined}
        bg={bg}
        pt={[5, 6]}
      />

      <Container mt={[5, 6]}>
        <Separator mx="auto" />
      </Container>

      <Container id="contact" mt={[4, 5]} mb={5} pt={3} maxWidth="48rem">
        <Heading textAlign="center">{unwidow(title)}</Heading>

        {hasIntro && (
          <MarkdownContent
            mt={3}
            fontSize={[1, 2]}
            center
            dangerouslySetInnerHTML={{
              __html: contentfulData.introText.content.html,
            }}
          />
        )}

        <ContactForm mt={[4, 5]} />
      </Container>
    </>
  )
}

HomePage.propTypes = {
  data: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query HomePageQuery($featuredVideoId: String) {
    youTubeVideo(videoId: { eq: $featuredVideoId }) {
      videoId
      title

      localThumbnail {
        childImageSharp {
          fluid(maxWidth: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }

    contentfulHomePageContact(entryTitle: { ne: "SCHEMA__HomePageContact" }) {
      title
      introText {
        content: childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default withTheme(HomePage)
