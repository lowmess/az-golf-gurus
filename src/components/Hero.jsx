import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Box, Heading, Button } from 'rebass'
import unwidow from '../utils/unwidow'
import Container from './Container'
import MarkdownContent from './MarkdownContent'

const heroImageStyles = {
  position: 'absolute !important',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'greens.7',

  '.gatsby-image-wrapper': {
    position: 'absolute !important',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },

  'img, picture': {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
}

const Hero = ({ bg }) => {
  const { contentfulHomePageHero: data } = useStaticQuery(graphql`
    query {
      contentfulHomePageHero(entryTitle: { ne: "SCHEMA__HomePageHero" }) {
        heroImage {
          title
          fluid(maxWidth: 2560) {
            ...GatsbyContentfulFluid_noBase64
          }
        }
        headline
        heroText {
          content: childMarkdownRemark {
            html
          }
        }
        contactButtonLabel
      }
    }
  `)

  const hasImage = data.heroImage && data.heroImage.fluid
  const hasIntro = data.heroText && data.heroText.content.html

  return (
    <Box sx={{ position: 'relative', paddingTop: [5, 6] }}>
      <Box sx={heroImageStyles}>
        {hasImage && <Img fluid={data.heroImage.fluid} />}
      </Box>

      <Container
        sx={{
          position: 'relative',
          marginBottom: 5,
        }}
      >
        <Heading
          as="h1"
          sx={{
            fontSize: [4, 5],
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            textShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.25)',
          }}
        >
          {unwidow(data.headline)}
        </Heading>
      </Container>

      <Box
        sx={{
          position: 'relative',
          backgroundImage: `linear-gradient(to bottom, transparent 50%, ${bg} 50%)`,
        }}
      >
        <Container
          maxWidth="48rem"
          sx={{
            borderRadius: [0, 1],
            paddingY: 4,
            backgroundColor: 'white',
            textAlign: 'center',
            boxShadow: [null, '0 0.5rem 4rem 0.5rem rgba(0, 0, 0, 0.25)'],
          }}
        >
          {hasIntro && (
            <MarkdownContent
              mb={4}
              fontSize={[1, 2]}
              center
              dangerouslySetInnerHTML={{ __html: data.heroText.content.html }}
            />
          )}

          <Button as="a" href="#contact" variant="outline">
            {data.contactButtonLabel || 'Get In Touch'}
          </Button>
        </Container>
      </Box>
    </Box>
  )
}

Hero.propTypes = {
  bg: PropTypes.string.isRequired,
}

Hero.defaultProps = {
  bg: '#ffffff',
}

export default Hero
