import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import { css } from 'styled-components'
import { Link } from 'rebass'
import { ListItem } from '../Typography'
import { themeHover, reverseThemeHover } from '../../utils/styles'

const NavLink = ({ children, to, ...props }) => {
  const listItemStyles = css`
    & + & {
      border-top: ${({ theme }) =>
        `${theme.borders[1]} ${theme.colors.greens[6]}`};
    }

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      display: inline-block;

      & + & {
        border-top: 0;
      }
    }
  `

  const linkStyles = css`
    display: inline-block;
    ${reverseThemeHover}

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {

      ${themeHover}

      &.active {
        border-bottom: ${({ theme }) =>
          `${theme.borders[2]} ${theme.colors.green}`};
      }
  }
`

  return (
    <ListItem
      width={[1, 'auto']}
      fontFamily="geomanist"
      textAlign="center"
      css={listItemStyles}
    >
      <Link
        as={GatsbyLink}
        to={to}
        activeClassName="active"
        py={3}
        px={2}
        css={linkStyles}
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

export default NavLink
