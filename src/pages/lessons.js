import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Box, Flex, Text, Button } from 'rebass'
import { Heading, Paragraph } from '../components/Typography'
import Container from '../components/Container'
import { Header, HeaderTitle, HeaderDescription } from '../components/Header'
import { useSiteMetadata } from '../utils/hooks'
import { toMoney } from '../utils/price'
import { themeHover } from '../utils/styles'
import unwidow from '../utils/unwidow'

const LessonGroup = styled(Box)`
  & + & {
    margin-top: ${({ theme }) => theme.space[5]};
    border-top: ${({ theme }) => `${theme.borders[1]} ${theme.colors.green}`};
    padding-top: ${({ theme }) => theme.space[5]};
  }
`

const Lesson = styled(Box)`
  & + & {
    margin-top: ${({ theme }) => theme.space[5]};

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      margin-top: 0;
      margin-left: ${({ theme }) => theme.space[6]};
    }
  }
`

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
        <HeaderTitle>{pageTitle}</HeaderTitle>

        {hasDescription && (
          <HeaderDescription markdown>
            {data.contentfulLessonsPage.description.content.html}
          </HeaderDescription>
        )}
      </Header>

      <Container my={5} css="text-align: center;">
        {data.allContentfulLessonCategory.edges.map(edge => {
          const { title, lessons } = edge.node

          return (
            <LessonGroup key={edge.node.title}>
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
                    <Lesson key={lesson.contentful_id}>
                      <Paragraph mt={0} mx="auto" mb={3} fontSize={[3, 4]}>
                        <Link
                          to={`/lessons/${lesson.contentful_id}/`}
                          css={themeHover}
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
                    </Lesson>
                  )
                })}
              </Flex>
            </LessonGroup>
          )
        })}
      </Container>
    </>
  )
}

export default LessonsPage
