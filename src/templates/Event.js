import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Box } from 'rebass'
import Container from '../components/Container'
import { Header, HeaderTitle, HeaderDescription } from '../components/Header'
import { toMoney } from '../utils/price'
import unwidow from '../utils/unwidow'

const EventTemplate = ({ data }) => {
  const event = data.contentfulEvent
  const description = event.description && event.description.content.html

  useEffect(() => {
    if (typeof document === 'undefined') return false

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    // sort of unfortunate there's no way to force Calendly to re-mount,
    // so we have to append it each time
    document.body.appendChild(script)
  }, [])

  return (
    <Container>
      <Header>
        <Box as="p" m={0} fontSize={[1, 2]} css="font-style: italic">
          <time dateTime={event.startDate}>{event.startDateString}</time>{' '}
          {'\u2014'} <time dateTime={event.endDate}>{event.endDateString}</time>
        </Box>

        <HeaderTitle>{event.title}</HeaderTitle>

        <Box as="p" mt={3} fontSize={[1, 2, 3]}>
          {unwidow(event.location)} {'\u2022'} {toMoney(event.price)}
        </Box>

        {description && (
          <HeaderDescription mt={5} markdown>
            {description}
          </HeaderDescription>
        )}
      </Header>

      <Box
        mt={6}
        mb={4}
        className="calendly-inline-widget"
        data-url={event.calendlyUrl}
        style={{ minWidth: '320px', height: '1024px' }}
      />
    </Container>
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
