import React, { Fragment } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Box, Text } from 'rebass'
import { Heading, Separator } from '../components/Typography'
import Container from '../components/Container'
import { toMoney } from '../utils/price'

const toSnakeCase = str =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, '-')

const LessonsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulLessonCategory(
        filter: { title: { ne: "SCHEMA__LessonCategory" } }
        sort: { order: ASC, fields: [order] }
      ) {
        edges {
          node {
            title
            lessons {
              id
              title
              price
            }
          }
        }
      }
    }
  `)

  return (
    <Container>
      <Text textAlign="center" pt={5}>
        <Heading as="h1" fontSize={[4, 5]} fontWeight={['medium', 'bold']}>
          Lessons
        </Heading>
      </Text>

      <Separator mt={4} mx="auto" />

      <Box>
        {data.allContentfulLessonCategory.edges.map(edge => {
          const { title, lessons } = edge.node
          const baseUrl = `/lessons/${toSnakeCase(title)}`

          return (
            <Fragment key={edge.node.title}>
              <Heading>{title}</Heading>

              <Box>
                {lessons.map(lesson => {
                  const url = `${baseUrl}-${toSnakeCase(lesson.title)}/`

                  return (
                    <p key={lesson.id}>
                      <Link to={url}>
                        {lesson.title} - {toMoney(lesson.price)}
                      </Link>
                    </p>
                  )
                })}
              </Box>
            </Fragment>
          )
        })}
      </Box>
    </Container>
  )
}

export default LessonsPage
