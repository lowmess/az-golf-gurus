import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Box } from 'rebass'
import Container from '../components/Container'
import Header from '../components/Header'
import CalendlyEmbed from '../components/CalendlyEmbed'
import { useSiteMetadata } from '../utils/hooks'
import unwidow from '../utils/unwidow'
import { toMoney } from '../utils/price'

const LessonTemplate = ({ data }) => {
  const { title: siteTitle } = useSiteMetadata()
  const {
    calendlyUrl,
    title,
    description,
    price,
    lesson_category,
  } = data.contentfulLesson

  return (
    <>
      <Helmet>
        <title>
          {lesson_category[0].title} - {title} | {siteTitle}
        </title>
      </Helmet>

      <Header>
        <Header.Title>{unwidow(lesson_category[0].title)}</Header.Title>

        <Box as="p" mt={3} fontSize={[1, 2, 3]}>
          {unwidow(title)} {'\u2022'} {toMoney(price)}
        </Box>

        {description && (
          <Header.Description markdown>
            {description.content.html}
          </Header.Description>
        )}
      </Header>

      <Container mt={[5, 6]} mb={5}>
        <CalendlyEmbed url={calendlyUrl} />
      </Container>
    </>
  )
}

LessonTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query LessonById($contentful_id: String!) {
    contentfulLesson(contentful_id: { eq: $contentful_id }) {
      calendlyUrl
      title
      description {
        content: childMarkdownRemark {
          html
        }
      }
      price
      lesson_category {
        title
      }
    }
  }
`

export default LessonTemplate
