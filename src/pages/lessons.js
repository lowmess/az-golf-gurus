import React, { Fragment } from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { Box } from 'rebass'
import { Heading } from '../components/Typography'
import Container from '../components/Container'
import { Header, HeaderTitle } from '../components/Header'
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
    <>
      <Header>
        <HeaderTitle>Lessons</HeaderTitle>
      </Header>

      <Container>
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
    </>
  )
}

export default LessonsPage
