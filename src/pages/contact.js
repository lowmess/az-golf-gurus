import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Container from '../components/Container'
import { Header, HeaderTitle, HeaderDescription } from '../components/Header'
import ContactForm from '../components/ContactForm'
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

  const pageTitle =
    (data.contentfulContactPage && data.contentfulContactPage.title) ||
    'Get in Touch'

  const hasDescription =
    data.contentfulContactPage && data.contentfulContactPage.description

  return (
    <>
      <Header>
        <HeaderTitle>{unwidow(pageTitle)}</HeaderTitle>

        {hasDescription && (
          <HeaderDescription markdown>
            {data.contentfulContactPage.description.content.html}
          </HeaderDescription>
        )}
      </Header>

      <Container my={5} maxWidth="48rem">
        <ContactForm />
      </Container>
    </>
  )
}

export default ContactPage
