import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

const LessonTemplate = ({ data }) => <pre>{JSON.stringify(data)}</pre>

LessonTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query LessonById($contentful_id: String!) {
    contentfulLesson(contentful_id: { eq: $contentful_id }) {
      title
      lesson_category {
        title
      }
    }
  }
`

export default LessonTemplate
