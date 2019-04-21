import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { Text, Card } from 'rebass'
import { Heading, List, ListItem } from '../components/Typography'
import Container from '../components/Container'
import { Header, HeaderTitle } from '../components/Header'
import MarkdownContent from '../components/MarkdownContent'
import unwidow from '../utils/unwidow'

const TeamMember = styled(Card)`
  --photo-size: 6rem;

  position: relative;
  padding-top: calc(
    (var(--photo-size) * 0.5) + ${({ theme }) => theme.space[3]}
  );
  box-shadow: 0 1.75rem 4rem 0.5rem rgba(0, 0, 0, 0.25);

  & + & {
    margin-top: ${({ theme }) => theme.space[6]};
  }
`

const TeamMemberPhoto = styled(Card)`
  display: flex;
  position: absolute;
  top: calc((var(--photo-size) * -0.5));
  right: calc(50% - (var(--photo-size) * 0.5));
  left: calc(50% - (var(--photo-size) * 0.5));
  width: calc(var(--photo-size) + ${({ theme }) => theme.space[2]});
  height: calc(var(--photo-size) + ${({ theme }) => theme.space[2]});
  box-shadow: 0 0 1rem 0.125rem rgba(0, 0, 0, 0.125);
  overflow: hidden;

  .gatsby-image-wrapper {
    margin: auto;
    border-radius: 100%;
  }
`

const AboutPage = () => {
  const {
    contentfulAboutPage,
    allContentfulTeamMember,
  } = useStaticQuery(graphql`
    query {
      contentfulAboutPage(title: { ne: "SCHEMA__AboutPage" }) {
        title
        description {
          content: childMarkdownRemark {
            html
          }
        }
        teamMembersHeading
        teamMembers {
          photo {
            fixed(width: 96, height: 96) {
              ...GatsbyContentfulFixed
            }
          }
          name
          title
          bio {
            content: childMarkdownRemark {
              html
            }
          }
        }
      }
      allContentfulTeamMember(filter: { name: { ne: "SCHEMA__TeamMember" } }) {
        edges {
          node {
            photo {
              fixed(width: 96, height: 96) {
                ...GatsbyContentfulFixed
              }
            }
            name
            title
            bio {
              content: childMarkdownRemark {
                html
              }
            }
          }
        }
      }
    }
  `)

  const pageTitle =
    (contentfulAboutPage && contentfulAboutPage.title) || 'About Us'

  const hasDescription = contentfulAboutPage && contentfulAboutPage.description

  const hasMembers =
    allContentfulTeamMember && !!allContentfulTeamMember.edges.length

  const membersTitle =
    (contentfulAboutPage && contentfulAboutPage.teamMembersHeading) ||
    'Meet the Gurus'

  return (
    <>
      <Header>
        <HeaderTitle>{unwidow(pageTitle)}</HeaderTitle>
      </Header>

      <Container my={5} css="text-align: center;">
        {hasDescription && (
          <MarkdownContent
            fontSize={[2, 3]}
            center
            dangerouslySetInnerHTML={{
              __html: contentfulAboutPage.description.content.html,
            }}
          />
        )}

        {hasMembers && (
          <>
            <Heading my={6} fontSize={[4, 5]}>
              {unwidow(membersTitle)}
            </Heading>

            <List>
              {allContentfulTeamMember.edges.map(edge => {
                const { photo, name, title, bio } = edge.node

                return (
                  <TeamMember
                    as={ListItem}
                    key={name}
                    borderRadius="3"
                    px={3}
                    pb={[4, 5]}
                  >
                    <TeamMemberPhoto
                      bg="white"
                      border="1"
                      borderColor="grays.2"
                      borderRadius="100%"
                    >
                      <Img fixed={photo.fixed} />
                    </TeamMemberPhoto>

                    <Heading as="h3" fontSize={[3, 4, 5]} fontWeight="bold">
                      {unwidow(name)}
                    </Heading>

                    {title && (
                      <Text
                        as="p"
                        mt={1}
                        mb={0}
                        fontSize={[2, 3]}
                        fontFamily="geomanist"
                        fontWeight="medium"
                      >
                        {unwidow(title)}
                      </Text>
                    )}

                    {bio && (
                      <MarkdownContent
                        mt={[3, 4]}
                        fontSize={[1, 2]}
                        center
                        dangerouslySetInnerHTML={{ __html: bio.content.html }}
                      />
                    )}
                  </TeamMember>
                )
              })}
            </List>
          </>
        )}
      </Container>
    </>
  )
}

export default AboutPage
