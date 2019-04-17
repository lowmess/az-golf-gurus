import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { css } from 'styled-components'
import { Box, Text, Button } from 'rebass'
import { Heading, List, ListItem, Separator } from '../components/Typography'
import Container from '../components/Container'
import MarkdownContent from '../components/MarkdownContent'
import { toMoney } from '../utils/price'
import { themeHover } from '../utils/styles'

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

  const pageTitle =
    (data.contentfulEventsPage && data.contentfulEventsPage.title) || 'Events'
  const hasDescription =
    data.contentfulEventsPage && data.contentfulEventsPage.description

  const itemStyles = css`
    & + & {
      margin-top: ${({ theme }) => theme.space[5]};
      border-top: ${({ theme }) => `${theme.borders[1]} ${theme.colors.green}`};
      padding-top: ${({ theme }) => theme.space[5]};
    }
  `

  return (
    <Container>
      <Text textAlign="center" pt={5}>
        <Heading as="h1" fontSize={[4, 5]} fontWeight={['medium', 'bold']}>
          {pageTitle}
        </Heading>

        {hasDescription && (
          <MarkdownContent
            mt={4}
            fontSize={[1, 2]}
            center
            dangerouslySetInnerHTML={{
              __html: data.contentfulEventsPage.description.content.html,
            }}
          />
        )}
      </Text>

      <Separator mt={4} mx="auto" />

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
              <ListItem key={contentful_id} css={itemStyles}>
                <Box as="p" m={0} fontSize={[1, 2]} css="font-style: italic">
                  <time dateTime={startDate}>{startDateString}</time> {'\u2014'}{' '}
                  <time dateTime={endDate}>{endDateString}</time>
                </Box>

                <Heading fontSize={[3, 4, 5]}>
                  <Link to={url} css={themeHover}>
                    {title}
                  </Link>
                </Heading>

                <Box as="p" mt={3} mb={4} fontSize={[1, 2, 3]}>
                  {location} {'\u2022'} {toMoney(price)}
                </Box>

                <Button variant="outline" as={Link} to={url} fontSize={[1, 2]}>
                  Sign up
                </Button>
              </ListItem>
            )
          )
        })}
      </List>
    </Container>
  )
}

export default EventsPage
