import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from 'styled-components'
import { Box, Button } from 'rebass'
import { Heading } from './Typography'
import Container from './Container'
import MarkdownContent from './MarkdownContent'
import unwidow from '../utils/unwidow'

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

  const heroStyles = css`
    position: relative;
  `

  const headingStyles = css`
    position: relative;

    /*
     * For some reason, applying this CSS directly to the <Heading> breaks
     * rebass/styled-components. I do not know why. Hence the first 3 words.
     */
    h1 {
      text-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
    }
  `

  const imageStyles = css`
    position: absolute !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.greens[7]};

    img,
    picture {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  `

  const contentStyles = css`
    position: relative;
    background-image: linear-gradient(to bottom, transparent 50%, ${bg} 50%);
  `

  return (
    <Box pt={[5, 6]} css={heroStyles}>
      {hasImage ? (
        <Img
          fadeIn={true}
          src={data.heroImage.fluid.src}
          sizes={data.heroImage.fluid}
          css={imageStyles}
        />
      ) : (
        <Box css={imageStyles} />
      )}

      <Container mb={5} css={headingStyles}>
        <Heading
          as="h1"
          fontSize={[4, 5]}
          fontWeight="bold"
          color="white"
          textAlign="center"
        >
          {unwidow(data.headline)}
        </Heading>
      </Container>

      <Box css={contentStyles}>
        <Container
          bg="white"
          py={4}
          borderRadius={[0, 1]}
          boxShadow={['', '0 0.5rem 4rem 0.5rem rgba(0, 0, 0, 0.25)']}
          maxWidth="48rem"
          css="text-align: center"
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
