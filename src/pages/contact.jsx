import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Container from '../components/Container'
import Header from '../components/Header'
import ContactForm from '../components/ContactForm'
import { useSiteMetadata } from '../utils/hooks'
import unwidow from '../utils/unwidow'

const ContactPage = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulContactPage(title: { ne: "SCHEMA__ContactPage" }) {
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

  const pageTitle =
    (data.contentfulContactPage && data.contentfulContactPage.title) ||
    'Get in Touch'

  const hasDescription =
    data.contentfulContactPage && data.contentfulContactPage.description

  return (
    <>
      <Helmet>
        <title>
          {pageTitle} | {siteTitle}
        </title>
      </Helmet>

      <Header>
        <Header.Title>{unwidow(pageTitle)}</Header.Title>

        {hasDescription && (
          <Header.Description markdown>
            {data.contentfulContactPage.description.content.html}
          </Header.Description>
        )}
      </Header>

      <Container my={5} maxWidth="48rem">
        <ContactForm />
      </Container>
    </>
  )
}

export default ContactPage
