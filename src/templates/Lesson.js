import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Box } from 'rebass'
import Container from '../components/Container'
import { Header, HeaderTitle, HeaderDescription } from '../components/Header'
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
        <HeaderTitle>{unwidow(lesson_category[0].title)}</HeaderTitle>

        <Box as="p" mt={3} fontSize={[1, 2, 3]}>
          {unwidow(title)} {'\u2022'} {toMoney(price)}
        </Box>

        {description && (
          <HeaderDescription markdown>
            {description.content.html}
          </HeaderDescription>
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
