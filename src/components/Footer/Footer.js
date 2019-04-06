import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink, useStaticQuery, graphql } from 'gatsby'
import { css } from 'styled-components'
import { Box, Flex, Link } from 'rebass'
import { Heading, List, ListItem } from '../Typography'
import Container from '../Container'
import Logo from './Logo'
import * as Icon from './socialMediaIcons'
import { reverseThemeHover } from '../../utils/styles'

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
  <List fontSize={2} css="display: inline-block" {...props}>
    {children}
  </List>
)

FooterList.propTypes = {
  children: PropTypes.node.isRequired,
}

const FooterLink = ({ children, to, ...props }) => {
  const styles = css`
    text-align: center;

    & + & {
      margin-top: ${({ theme }) => theme.space[1]};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      display: inline-block;
      text-align: initial;

      & + & {
        margin-top: 0;
        margin-left: ${({ theme }) => theme.space[3]};
      }
    }
  `

  return (
    <ListItem css={styles}>
      <Link as={GatsbyLink} to={to} css={reverseThemeHover} {...props}>
        {children}
      </Link>
    </ListItem>
  )
}

FooterLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
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
    <Box as="footer" bg="greens.7" color="white" py={[4, 4, 5]} {...props}>
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
            </FooterList>
          </FooterLinkContainer>

          <FooterLinkContainer mb={[5, 4, 3]}>
            <FooterHeading>Company</FooterHeading>

            <FooterList>
              <FooterLink to="/about/">About Us</FooterLink>

              <FooterLink to="/team/">Team</FooterLink>

              <FooterLink to="/contact/">Contact</FooterLink>
            </FooterList>
          </FooterLinkContainer>

          <List textAlign={['center', 'initial']}>
            {accounts.edges.map(({ node: { network, link } }) => {
              const ComponentName = Icon[network]
              const styles = css`
                display: inline-block;

                & + & {
                  margin-left: ${({ theme }) => theme.space[3]};
                }
              `

              return (
                <ListItem key={network} css={styles} fontSize={3}>
                  <Link href={link} css={reverseThemeHover}>
                    <ComponentName />
                  </Link>
                </ListItem>
              )
            })}
          </List>
        </Box>

        <Logo width={['4rem', '8rem']} />
      </Flex>
    </Box>
  )
}

export default Footer
