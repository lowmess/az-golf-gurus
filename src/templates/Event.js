import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Box } from 'rebass'
import Container from '../components/Container'
import { Header, HeaderTitle, HeaderDescription } from '../components/Header'
import CalendlyEmbed from '../components/CalendlyEmbed'
import { toMoney } from '../utils/price'
import unwidow from '../utils/unwidow'

const EventTemplate = ({ data }) => {
  const event = data.contentfulEvent
  const description = event.description && event.description.content.html

  return (
    <>
      <Header>
        <Box as="p" m={0} fontSize={[1, 2]} css="font-style: italic">
          <time dateTime={event.startDate}>{event.startDateString}</time>{' '}
          {'\u2014'} <time dateTime={event.endDate}>{event.endDateString}</time>
        </Box>

        <HeaderTitle>{unwidow(event.title)}</HeaderTitle>

        <Box as="p" mt={3} fontSize={[1, 2, 3]}>
          {unwidow(event.location)} {'\u2022'} {toMoney(event.price)}
        </Box>

        {description && (
          <HeaderDescription mt={5} markdown>
            {description}
          </HeaderDescription>
        )}
      </Header>

      <Container mt={[5, 6]} mb={5}>
        <CalendlyEmbed url={event.calendlyUrl} />
      </Container>
    </>
  )
}

EventTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query EventById($contentful_id: String!) {
    contentfulEvent(contentful_id: { eq: $contentful_id }) {
      calendlyUrl
      title
      description {
        content: childMarkdownRemark {
          html
        }
      }
      price
      location
      startDate
      startDateString: startDate(formatString: "MMMM Do")
      endDate
      endDateString: endDate(formatString: "MMMM Do")
    }
  }
`

export default EventTemplate
