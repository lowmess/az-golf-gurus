import React, { Fragment } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Box, Text } from 'rebass'
import { Heading, Separator } from '../components/Typography'
import Container from '../components/Container'
import { toMoney } from '../utils/price'

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
              contentful_id
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

          return (
            <Fragment key={edge.node.title}>
              <Heading>{title}</Heading>

              <Box>
                {lessons.map(lesson => {
                  return (
                    <p key={lesson.contentful_id}>
                      <Link to={`/lessons/${lesson.contentful_id}/`}>
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
