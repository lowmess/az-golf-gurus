import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Box, Button } from 'rebass'
import { Heading, List, ListItem } from '../components/Typography'
import Container from '../components/Container'
import { Header, HeaderTitle, HeaderDescription } from '../components/Header'
import { useSiteMetadata } from '../utils/hooks'
import { toMoney } from '../utils/price'
import unwidow from '../utils/unwidow'
import { themeHover } from '../utils/styles'

const EventContainer = styled(ListItem)`
  & + & {
    margin-top: ${({ theme }) => theme.space[5]};
    border-top: ${({ theme }) => `${theme.borders[1]} ${theme.colors.green}`};
    padding-top: ${({ theme }) => theme.space[5]};
  }
`

const EventsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulEventsPage(title: { ne: "SCHEMA__EventsPage" }) {
        title
        description {
          content: childMarkdownRemark {
            html
          }
        }
      }
      allContentfulEvent(
        filter: { title: { ne: "SCHEMA__Event" } }
        sort: { order: ASC, fields: [startDate] }
      ) {
        edges {
          node {
            contentful_id
            title
            price
            location
            startDate
            startDateTime: startDate(formatString: "x")
            startDateString: startDate(formatString: "MMMM Do")
            endDate
            endDateString: endDate(formatString: "MMMM Do")
          }
        }
      }
    }
  `)
  const { title: siteTitle } = useSiteMetadata()

  const pageTitle =
    (data.contentfulEventsPage && data.contentfulEventsPage.title) || 'Events'

  const hasDescription =
    data.contentfulEventsPage && data.contentfulEventsPage.description

  return (
    <>
      <Helmet>
        <title>
          {pageTitle} | {siteTitle}
        </title>
      </Helmet>

      <Header>
        <HeaderTitle>{unwidow(pageTitle)}</HeaderTitle>

        {hasDescription && (
          <HeaderDescription markdown>
            {data.contentfulEventsPage.description.content.html}
          </HeaderDescription>
        )}
      </Header>

      <Container>
        <List textAlign="center" py={5}>
          {data.allContentfulEvent.edges.map(edge => {
            const {
              contentful_id,
              title,
              price,
              location,
              startDateTime,
              startDate,
              startDateString,
              endDate,
              endDateString,
            } = edge.node

            const today = new Date()
            const shouldDisplay = today.getTime() < startDateTime

            const url = `/events/${contentful_id}/`

            return (
              shouldDisplay && (
                <EventContainer key={contentful_id}>
                  <Box as="p" m={0} fontSize={[1, 2]} css="font-style: italic">
                    <time dateTime={startDate}>{startDateString}</time>{' '}
                    {'\u2014'} <time dateTime={endDate}>{endDateString}</time>
                  </Box>

                  <Heading fontSize={[3, 4, 5]} fontWeight="bold">
                    <Link to={url} css={themeHover}>
                      {unwidow(title)}
                    </Link>
                  </Heading>

                  <Box as="p" mt={3} mb={4} fontSize={[1, 2, 3]}>
                    {unwidow(location)} {'\u2022'} {toMoney(price)}
                  </Box>

                  <Button
                    variant="outline"
                    as={Link}
                    to={url}
                    fontSize={[1, 2]}
                  >
                    Register
                  </Button>
                </EventContainer>
              )
            )
          })}
        </List>
      </Container>
    </>
  )
}

export default EventsPage
