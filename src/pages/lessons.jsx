import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Box, Flex, Text, Heading, Button } from 'rebass'
import Paragraph from '../components/Paragraph'
import Container from '../components/Container'
import Header from '../components/Header'
import { useSiteMetadata } from '../utils/hooks'
import { toMoney } from '../utils/price'
import unwidow from '../utils/unwidow'

const LessonsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulLessonsPage(title: { ne: "SCHEMA__LessonsPage" }) {
        title
        description {
          content: childMarkdownRemark {
            html
          }
        }
      }
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
  const { title: siteTitle } = useSiteMetadata()

  const pageTitle =
    (data.contentfulLessonsPage && data.contentfulLessonsPage.title) ||
    'Lessons'
  const hasDescription =
    data.contentfulLessonsPage && data.contentfulLessonsPage.description

  return (
    <>
      <Helmet>
        <title>
          {pageTitle} | {siteTitle}
        </title>
      </Helmet>

      <Header>
        <Header.Title>{pageTitle}</Header.Title>

        {hasDescription && (
          <Header.Description markdown>
            {data.contentfulLessonsPage.description.content.html}
          </Header.Description>
        )}
      </Header>

      <Container my={5} sx={{ textAlign: 'center' }}>
        {data.allContentfulLessonCategory.edges.map(edge => {
          const { title, lessons } = edge.node

          return (
            <Box
              sx={{
                '& + &': {
                  marginTop: 5,
                  borderTop: 1,
                  borderColor: 'green',
                  paddingTop: 5,
                },
              }}
              key={edge.node.title}
            >
              <Heading mb={[5, 4]} fontSize={[5, 6]}>
                {unwidow(title)}
              </Heading>

              <Flex
                flexDirection={['column', 'row']}
                justifyContent="center"
                alignItems="center"
              >
                {lessons.map(lesson => {
                  return (
                    <Box
                      sx={{
                        '& + &': {
                          marginTop: [5, 0],
                          marginLeft: [null, 6],
                        },
                      }}
                      key={lesson.contentful_id}
                    >
                      <Paragraph mt={0} mx="auto" mb={3} fontSize={[3, 4]}>
                        <Link
                          variant="ui-link"
                          to={`/lessons/${lesson.contentful_id}/`}
                        >
                          <Text
                            as="span"
                            fontFamily="geomanist"
                            fontWeight="bold"
                          >
                            {unwidow(lesson.title)}
                          </Text>{' '}
                          {'\u2022'} {toMoney(lesson.price)}
                        </Link>
                      </Paragraph>

                      <Button
                        variant="outline"
                        as={Link}
                        to={`/lessons/${lesson.contentful_id}/`}
                      >
                        Book
                      </Button>
                    </Box>
                  )
                })}
              </Flex>
            </Box>
          )
        })}
      </Container>
    </>
  )
}

export default LessonsPage
