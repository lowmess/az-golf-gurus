import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import { Box, Flex, Heading, Link } from 'rebass'
import { List, ListItem } from '../Typography'
import Container from '../Container'
import Wave from './Wave'
import Logo from './Logo'
import * as Icon from './SocialMediaIcons'

const FooterLinkContainer = ({ children, ...props }) => (
  <Flex
    flexDirection={['column', 'column', 'row']}
    alignItems={['center', 'flex-start', 'baseline']}
    mb={[5, 4, 3]}
    {...props}
  >
    {children}
  </Flex>
)

FooterLinkContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

const FooterHeading = ({ children, ...props }) => (
  <Heading mr={[0, 0, 4]} mb={[2, 2, 0]} fontSize={3}>
    {children}
  </Heading>
)

FooterHeading.propTypes = {
  children: PropTypes.string.isRequired,
}

const FooterList = ({ children, ...props }) => (
  <List sx={{ fontSize: 2, display: 'inline-block' }} {...props}>
    {children}
  </List>
)

FooterList.propTypes = {
  children: PropTypes.node.isRequired,
}

const FooterLink = ({ children, to, ...props }) => (
  <ListItem
    sx={{
      display: [null, 'inline-block'],
      textAlign: ['center', 'initial'],

      '& + &': {
        marginTop: [1, 0],
        marginLeft: [0, 3],
      },
    }}
  >
    <Link as={GatsbyLink} to={to} variant="reverse-link" {...props}>
      {children}
    </Link>
  </ListItem>
)

FooterLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

const SocialMediaIcon = ({ sx, children, ...props }) => (
  <ListItem
    sx={{
      display: 'inline-block',

      '& + &': {
        marginLeft: 3,
      },

      ...sx,
    }}
    {...props}
  >
    {children}
  </ListItem>
)

SocialMediaIcon.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
}

const Footer = props => {
  const { allContentfulSocialMediaAccount: accounts } = useStaticQuery(graphql`
    query {
      allContentfulSocialMediaAccount(sort: { order: ASC, fields: [network] }) {
        edges {
          node {
            network
            link
          }
        }
      }
    }
  `)

  return (
    <>
      <Wave color="greens.7" />

      <Box
        as="footer"
        bg="greens.7"
        color="white"
        pt={5}
        pb={[4, 4, 5]}
        {...props}
      >
        <Flex
          as={Container}
          flexDirection={['column', 'row']}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flex="1" mr={[0, 4]} mb={[5, 0]}>
            <FooterLinkContainer mb={[5, 4, 3]}>
              <FooterHeading>Learn</FooterHeading>

              <FooterList>
                <FooterLink to="/videos/">Videos</FooterLink>

                <FooterLink to="/lessons/">Lessons</FooterLink>

                <FooterLink to="/events/">Events</FooterLink>
              </FooterList>
            </FooterLinkContainer>

            <FooterLinkContainer mb={[5, 4, 3]}>
              <FooterHeading>Company</FooterHeading>

              <FooterList>
                <FooterLink to="/about/">About Us</FooterLink>

                <FooterLink to="/contact/">Contact</FooterLink>
              </FooterList>
            </FooterLinkContainer>

            <List textAlign={['center', 'initial']}>
              {accounts.edges.map(({ node: { network, link } }) => {
                // eslint-disable-next-line import/namespace
                const IconGlyph = Icon[network]

                return (
                  <SocialMediaIcon key={network} fontSize={3}>
                    <Link href={link} variant="reverse-link">
                      <IconGlyph />
                    </Link>
                  </SocialMediaIcon>
                )
              })}
            </List>
          </Box>

          <Logo width={['4rem', '8rem']} />
        </Flex>
      </Box>
    </>
  )
}

export default Footer
