import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { css } from 'styled-components'
import { Box, Flex, Button, Card } from 'rebass'
import Container from '../Container'
import { List, ListItem } from '../Typography'
import SkipNavLink from './SkipNavLink'
import Logo from './Logo'
import { themeHover } from '../../utils/styles'

const NavLink = ({ children, to, ...props }) => {
  const styles = css`
    display: inline-block;

    ${themeHover};

    &.active {
      border-bottom: ${({ theme }) => theme.borders[2]}
        ${({ theme }) => theme.colors.green};
    }
  `

  return (
    <ListItem fontFamily="sans-serif" css="display: inline-block">
      <Box
        as={Link}
        to={to}
        activeClassName="active"
        py={3}
        px={2}
        css={styles}
        {...props}
      >
        {children}
      </Box>
    </ListItem>
  )
}

NavLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

const Navigation = ({ location }) => (
  <Card as="header" boxShadow="0 -0.25rem 0.5rem 0.125rem rgba(0, 0, 0, 0.25)">
    <Container css="position: relative">
      <SkipNavLink />

      <Flex as="nav" alignItems="center" justifyContent="space-between">
        <Logo />

        <Flex as={List} alignItems="stretch" css="height: 100%;">
          <NavLink to="/" mr={2}>
            Home
          </NavLink>

          <NavLink to="/videos/" mr={2}>
            Videos
          </NavLink>

          <NavLink to="/about/" mr={3}>
            Team
          </NavLink>

          <Flex as={ListItem} alignItems="center">
            <Button variant="primary" as={Link} to="/lessons/">
              Book a Lesson
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  </Card>
)

Navigation.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Navigation
