import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from 'styled-components'
import { Box, Button } from 'rebass'
import Container from '../Container'
import MarkdownContent from '../MarkdownContent'
import Logo from './Logo'

const Hero = () => {
  const { contentfulHomePageHero: data } = useStaticQuery(graphql`
    query {
      contentfulHomePageHero(entryTitle: { ne: "SCHEMA__HomePageHero" }) {
        heroImage {
          title
          fluid(maxWidth: 2560) {
            ...GatsbyContentfulFluid_noBase64
          }
        }
        heroText {
          content: childMarkdownRemark {
            html
          }
        }
        contactButtonLabel
      }
    }
  `)

  const heroStyles = css`
    position: relative;
  `

  const imageStyles = css`
    position: absolute !important;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;

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
    background-image: linear-gradient(
      to bottom,
      transparent 50%,
      ${({ theme }) => theme.colors.greens[0]} 50%
    );
  `

  return (
    <Box pt={5} css={heroStyles}>
      <Img
        fadeIn={true}
        alt={data.heroImage.title}
        src={data.heroImage.fluid.src}
        sizes={data.heroImage.fluid}
        css={imageStyles}
      />

      <Logo
        mb={5}
        color="white"
        css="position: relative; text-align: center;"
      />

      <Box css={contentStyles}>
        <Container
          bg="white"
          py={4}
          borderRadius={[0, 1]}
          boxShadow={['', '0 0.5rem 4rem 0.5rem rgba(0, 0, 0, 0.25)']}
          css="max-width: 48rem; text-align: center"
        >
          <MarkdownContent
            fontSize={[1, 2]}
            center
            dangerouslySetInnerHTML={{ __html: data.heroText.content.html }}
          />

          <Button as="a" href="#contact" variant="outline" mt={4}>
            {data.contactButtonLabel || 'Get In Touch'}
          </Button>
        </Container>
      </Box>
    </Box>
  )
}

export default Hero
