import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import { Box, Link, Button } from 'rebass'
import { Heading, Paragraph } from '../components/Typography'
import Container from '../components/Container'
import { themeHover } from '../utils/styles'

const Background = styled(Box)`
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.greens[0]},
    transparent
  );
`

const ErrorLink = styled(Link)`
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.green};
  ${themeHover};
`

const ErrorPage = () => (
  <Background py={5}>
    <Container css="text-align: center;">
      <Heading as="h1" mb={[2, 1, 0]}>
        Error 404
      </Heading>

      <Heading mb={5} fontSize={[4, 5, 6]} fontWeight="bold">
        Requested Page Not&nbsp;Found
      </Heading>

      <Paragraph mx="auto" mb={5} fontSize={[2, 3]}>
        Looks like we&rsquo;ve misplaced the page you were looking for. Sorry
        about that. We&rsquo;ll get to looking for it straight away&mdash;if you
        have any hints for where we might find it,{' '}
        <ErrorLink as={GatsbyLink} to="/contact/">
          please let us&nbsp;know
        </ErrorLink>
        .
      </Paragraph>

      <Button variant="outline-large" as={GatsbyLink} to="/" fontSize={[2, 3]}>
        Go to the home page
      </Button>
    </Container>
  </Background>
)

export default ErrorPage
