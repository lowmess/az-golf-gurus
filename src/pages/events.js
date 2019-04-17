import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Box, Text } from 'rebass'
import { Heading, Separator } from '../components/Typography'
import Container from '../components/Container'
import { toMoney } from '../utils/price'

const EventsPage = () => {
  const data = useStaticQuery(graphql`
    query {
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
            endDate
          }
        }
      }
    }
  `)

  return (
    <Container>
      <Text textAlign="center" pt={5}>
        <Heading as="h1" fontSize={[4, 5]} fontWeight={['medium', 'bold']}>
          Events
        </Heading>
      </Text>

      <Separator mt={4} mx="auto" />

      <Box>
        {data.allContentfulEvent.edges.map(edge => {
          const {
            contentful_id,
            title,
            price,
            location,
            startDate,
            endDate,
          } = edge.node

          return (
            <p key={contentful_id}>
              {title}
              <br />
              {toMoney(price)}
              <br />
              {location}
              <br />
              {startDate}
              <br />
              {endDate}
              <br />
              <Link to={`/events/${contentful_id}/`}>Sign up</Link>
            </p>
          )
        })}
      </Box>
    </Container>
  )
}

export default EventsPage
