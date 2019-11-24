import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Text, Heading, Link, Button } from 'rebass'
import List from '../components/List'
import Container from '../components/Container'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import { useSiteMetadata } from '../utils/hooks'
import { toMoney } from '../utils/price'
import unwidow from '../utils/unwidow'

const EventsPage = ({ data }) => {
  const { title: siteTitle } = useSiteMetadata()

  const pageTitle =
    (data.contentfulEventsPage && data.contentfulEventsPage.title) || 'Events'

  const hasDescription =
    data.contentfulEventsPage && data.contentfulEventsPage.description

  const hasEvents = data.allContentfulEvent.edges.length > 0

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
            {data.contentfulEventsPage.description.content.html}
          </Header.Description>
        )}
      </Header>

      <Container py={5} textAlign="center">
        {!hasEvents && (
          <Paragraph mx="auto">
            There are no upcoming events. Check back soon!
          </Paragraph>
        )}

        {hasEvents && (
          <List>
            {data.allContentfulEvent.edges.map(edge => {
              const {
                contentful_id,
                title,
                price,
                location,
                startDate,
                startDateString,
                endDate,
                endDateString,
              } = edge.node

              const url = `/events/${contentful_id}/`

              return (
                <List.Item
                  sx={{
                    '& + &': {
                      marginTop: 5,
                      borderTop: 1,
                      borderColor: 'green',
                      paddingTop: 5,
                    },
                  }}
                  key={contentful_id}
                >
                  <Text
                    as="p"
                    m={0}
                    fontSize={[1, 2]}
                    sx={{ fontStyle: 'italic' }}
                  >
                    <time dateTime={startDate}>{startDateString}</time>{' '}
                    {'\u2014'} <time dateTime={endDate}>{endDateString}</time>
                  </Text>

                  <Heading fontSize={[3, 4, 5]} fontWeight="bold">
                    <Link variant="ui-link" as={GatsbyLink} to={url}>
                      {unwidow(title)}
                    </Link>
                  </Heading>

                  <Text as="p" mt={3} mb={4} fontSize={[1, 2, 3]}>
                    {unwidow(location)} {'\u2022'} {toMoney(price)}
                  </Text>

                  <Button
                    variant="outline"
                    as={GatsbyLink}
                    to={url}
                    fontSize={[1, 2]}
                  >
                    Register
                  </Button>
                </List.Item>
              )
            })}
          </List>
        )}
      </Container>
    </>
  )
}

EventsPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query EventsPageQuery($today: Date) {
    contentfulEventsPage(title: { ne: "SCHEMA__EventsPage" }) {
      title
      description {
        content: childMarkdownRemark {
          html
        }
      }
    }

    allContentfulEvent(
      filter: { title: { ne: "SCHEMA__Event" }, startDate: { gt: $today } }
      sort: { order: ASC, fields: [startDate] }
    ) {
      edges {
        node {
          contentful_id
          title
          price
          location
          startDate
          startDateString: startDate(formatString: "MMMM Do")
          endDate
          endDateString: endDate(formatString: "MMMM Do")
        }
      }
    }
  }
`

export default EventsPage
