import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

const EventTemplate = ({ data }) => <pre>{JSON.stringify(data)}</pre>

EventTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query EventById($contentful_id: String!) {
    contentfulEvent(contentful_id: { eq: $contentful_id }) {
      title
    }
  }
`

export default EventTemplate
