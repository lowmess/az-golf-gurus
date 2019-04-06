import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { withTheme } from 'styled-components'
import Container from '../components/Container'
import { Heading, Rule } from '../components/Typography'
import MarkdownContent from '../components/MarkdownContent'
import Hero from '../components/Hero'
import FeaturedVideo from '../components/FeaturedVideo'
import ContactForm from '../components/ContactForm'

const HomePage = ({ theme }) => {
  const { contentfulHomePageContact } = useStaticQuery(graphql`
    query {
      contentfulHomePageContact(entryTitle: { ne: "SCHEMA__HomePageContact" }) {
        title
        introText {
          content: childMarkdownRemark {
            html
          }
        }
      }
    }
  `)
  const data = contentfulHomePageContact || {}
  const hasIntro = data && data.introText

  const bg = theme.colors.greens[0]

  return (
    <>
      <Hero bg={bg} />

      <FeaturedVideo bg={bg} pt={[5, 6]} />

      <Container mt={[5, 6]}>
        <Rule mx="auto" />
      </Container>

      <Container id="contact" mt={[4, 5]} mb={[5, 6]} pt={3} maxWidth="48rem">
        <Heading textAlign="center">{data.title || 'Get in Touch'}</Heading>

        {hasIntro && (
          <MarkdownContent
            mt={3}
            fontSize={[1, 2]}
            center
            dangerouslySetInnerHTML={{ __html: data.introText.content.html }}
          />
        )}

        <ContactForm mt={[4, 5]} />
      </Container>
    </>
  )
}

HomePage.propTypes = {
  theme: PropTypes.object.isRequired,
}

export default withTheme(HomePage)
