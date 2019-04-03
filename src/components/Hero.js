import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from 'styled-components'
import { Box, Button } from 'rebass'
import Container from '../components/Container'
import MarkdownContent from '../components/MarkdownContent'

const Hero = () => {
  const { contentfulHomePageHero: data } = useStaticQuery(graphql`
    query {
      contentfulHomePageHero(entryTitle: { eq: "Home Page Hero" }) {
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
    bottom 0;
    left: 0;
    width: 100%;
    height: 100%;

    img,
    picture {
      position: absolute;
      top: 0;
      right: 0;
      bottom 0;
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

      <Box mb={5} color="white" css="position: relative; text-align: center;">
        <svg
          viewBox="0 0 241 190"
          xmlns="http://www.w3.org/2000/svg"
          width="128"
          height="96"
        >
          <path
            fillRule="evenodd"
            d="M203.972 1.608C107.648-9.962 97.001 45.208.006 30.704v156.964c101.492 11.108 116.228-38.628 203.966-29.095V1.608zM47.922 142.382c5.094 2.419 12.88 4.25 20.426 3.783 16.131-1 29.027-8.423 27.76-28.851l-2.964-47.875-13.616.843.355 5.762c-1.701-1.998-7.565-6.683-16.782-6.112-15.609.967-25.975 13.597-24.93 30.464 1.041 16.866 12.147 28.062 27.968 27.082 9.532-.59 14.538-6.369 15.593-8.012l.153 2.514c.528 8.486-6.554 11.343-14.41 11.83-7.54.467-14-1.972-15.84-2.805l-3.714 11.377zm61.605-19.002c5.015 2.57 12.748 4.634 20.303 4.393 16.156-.516 29.27-7.55 28.613-28.008l-1.528-47.942-13.641.435.187 5.77c-1.642-2.047-7.363-6.905-16.595-6.61-15.633.499-26.369 12.813-25.831 29.703.542 16.89 11.303 28.413 27.148 27.907 9.543-.305 14.721-5.93 15.826-7.541l.079 2.518c.27 8.497-6.89 11.141-14.76 11.392-7.551.241-13.937-2.39-15.752-3.277l-4.05 11.26zM80.8 97.65c.602 9.743-4.665 16.379-13.044 16.898-8.171.506-14.435-5.521-15.031-15.159-.597-9.638 4.773-16.28 12.945-16.786 8.487-.526 14.553 5.724 15.13 15.047zm62.932-17.997c.311 9.756-5.153 16.231-13.547 16.5-8.181.26-14.262-5.95-14.568-15.603-.31-9.651 5.258-16.13 13.444-16.39 8.497-.272 14.37 6.156 14.671 15.493z"
          />
          <path d="M216.304 1.623h24.676V158.6h-24.676z" />
        </svg>
      </Box>

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
