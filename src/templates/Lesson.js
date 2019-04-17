import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

const LessonTemplate = ({ data }) => <pre>{JSON.stringify(data)}</pre>

LessonTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query LessonByCalendlyUrl($calendlyUrl: String!) {
    contentfulLesson(calendlyUrl: { eq: $calendlyUrl }) {
      title
      lesson_category {
        title
      }
    }
  }
`

export default LessonTemplate
