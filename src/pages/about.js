import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import { Flex, Text, Heading } from 'rebass'
import { List, ListItem } from '../components/Typography'
import Container from '../components/Container'
import Header from '../components/Header'
import MarkdownContent from '../components/MarkdownContent'
import { useSiteMetadata } from '../utils/hooks'
import unwidow from '../utils/unwidow'

const TeamMember = ({ sx, children, ...props }) => (
  <ListItem
    sx={{
      '--photo-size': '6rem',
      position: 'relative',
      borderRadius: 3,
      paddingTop: theme => `calc((var(--photo-size) * 0.5) + ${theme.space[3]}`,
      paddingX: 3,
      paddingBottom: [4, 5],
      boxShadow: '0 1.75rem 4rem 0.5rem rgba(0, 0, 0, 0.25)',

      '& + &': {
        marginTop: 6,
      },

      ...sx,
    }}
    {...props}
  >
    {children}
  </ListItem>
)

TeamMember.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
}

const TeamMemberPhoto = ({ sx, children, ...props }) => (
  <Flex
    sx={{
      position: 'absolute',
      top: 'calc((var(--photo-size) * -0.5))',
      right: 'calc(50% - (var(--photo-size) * 0.5))',
      left: 'calc(50% - (var(--photo-size) * 0.5))',
      width: theme => `calc(var(--photo-size) + ${theme.space[2]})`,
      height: theme => `calc(var(--photo-size) + ${theme.space[2]})`,
      borderColor: 'grays.2',
      borderRadius: '100%',
      backgroundColor: 'white',
      boxShadow: '0 0 1rem 0.125rem rgba(0, 0, 0, 0.125)',
      overflow: 'hidden',

      '.gatsby-image-wrapper': {
        margin: 'auto',
        borderRadius: '100%',
      },

      ...sx,
    }}
    {...props}
  >
    {children}
  </Flex>
)

TeamMemberPhoto.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
}

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
  const { title: siteTitle } = useSiteMetadata()

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
      <Helmet>
        <title>
          {pageTitle} | {siteTitle}
        </title>
      </Helmet>

      <Header>
        <Header.Title>{unwidow(pageTitle)}</Header.Title>
      </Header>

      <Container my={5} sx={{ textAlign: 'center' }}>
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
                  <TeamMember key={name}>
                    <TeamMemberPhoto>
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
