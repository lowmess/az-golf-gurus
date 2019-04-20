import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import styled from 'styled-components'
import { Link, Button } from 'rebass'
import { Heading, Paragraph } from '../components/Typography'
import Container from '../components/Container'
import { Header, HeaderTitle } from '../components/Header'
import { themeHover } from '../utils/styles'

const ErrorLink = styled(Link)`
  text-decoration: underline;
  text-decoration-color: ${({ theme }) => theme.colors.green};
  ${themeHover};
`

const ErrorPage = () => (
  <>
    <Header>
      <HeaderTitle mb={[2, 1, 0]} fontSize={[3, 4]} fontWeight="medium">
        Error 404
      </HeaderTitle>

      <Heading fontSize={[4, 5, 6]} fontWeight="bold">
        Requested Page Not&nbsp;Found
      </Heading>
    </Header>

    <Container my={5} css="text-align: center;">
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
  </>
)

export default ErrorPage
