import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import { css } from 'styled-components'
import { Flex, Link, Button } from 'rebass'
import { List, ListItem } from '../Typography'
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
      <Link
        as={GatsbyLink}
        to={to}
        activeClassName="active"
        py={3}
        px={2}
        css={styles}
        {...props}
      >
        {children}
      </Link>
    </ListItem>
  )
}

NavLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

const LinkList = () => (
  <Flex as={List} alignItems="baseline" css="height: 100%;">
    <NavLink to="/" mr={2}>
      Home
    </NavLink>

    <NavLink to="/videos/" mr={2}>
      Videos
    </NavLink>

    <NavLink to="/about/" mr={3}>
      Team
    </NavLink>

    <ListItem>
      <Button variant="primary-small" as={GatsbyLink} to="/lessons/">
        Book a Lesson
      </Button>
    </ListItem>
  </Flex>
)

export default LinkList
