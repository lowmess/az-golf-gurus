import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Heading, Button } from 'rebass'
import Container from '../components/Container'
import Header from '../components/Header'
import MarkdownContent from '../components/MarkdownContent'
import { useSiteMetadata } from '../utils/hooks'
import unwidow from '../utils/unwidow'

const ErrorPage = () => {
  const { contentfulErrorPage } = useStaticQuery(graphql`
    query {
      contentfulErrorPage(title: { ne: "SCHEMA__ErrorPage" }) {
        title
        description {
          content: childMarkdownRemark {
            html
          }
        }
      }
    }
  `)
  const { title: siteTitle } = useSiteMetadata()

  const title =
    (contentfulErrorPage && contentfulErrorPage.title) ||
    'Requested Page Not Found'

  const hasDescription = contentfulErrorPage && contentfulErrorPage.description

  return (
    <>
      <Helmet>
        <title>
          {title} | {siteTitle}
        </title>
      </Helmet>

      <Header>
        <Header.Title mb={[2, 1, 0]} fontSize={[3, 4]} fontWeight="medium">
          Error 404
        </Header.Title>

        <Heading fontSize={[4, 5, 6]} fontWeight="bold">
          {unwidow(title)}
        </Heading>
      </Header>

      <Container my={5} sx={{ textAlign: 'center' }}>
        {hasDescription && (
          <MarkdownContent
            mb={5}
            fontSize={[2, 3]}
            center
            dangerouslySetInnerHTML={{
              __html: contentfulErrorPage.description.content.html,
            }}
          />
        )}

        <Button variant="outline-large" as={Link} to="/" fontSize={[2, 3]}>
          Go to the home page
        </Button>
      </Container>
    </>
  )
}

export default ErrorPage
