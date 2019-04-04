import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import FocusTrap from 'focus-trap-react'
import noScroll from 'no-scroll'
import { css, withTheme } from 'styled-components'
import { rgba } from 'polished'
import { Flex, Link, Button } from 'rebass'
import { List, ListItem } from '../Typography'
import { themeHover } from '../../utils/styles'
import { Hamburger, Close } from './icons'

const menuHover = css`
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    color: ${({ theme }) => theme.colors.black};
  }
`

const NavLink = ({ children, to, ...props }) => {
  const listItemStyles = css`
    & + & {
      border-top: ${({ theme }) => theme.borders[1]};
      border-color: ${({ theme }) => theme.colors.greens[4]};
    }
  `

  const linkStyles = css`
    display: inline-block;
    ${menuHover};
  `

  return (
    <ListItem css={listItemStyles}>
      <Link as={GatsbyLink} to={to} py={3} px={4} css={linkStyles} {...props}>
        {children}
      </Link>
    </ListItem>
  )
}

NavLink.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

const MobileMenu = ({ theme }) => {
  const [open, setOpen] = useState(false)
  const openButtonEl = useRef(null)

  useEffect(() => {
    return () => {
      noScroll.off()
    }
  }, [])

  const openIconStyles = css`
    position: absolute;
    left: 0;
    ${themeHover};
  `

  const menuStyles = css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: ${rgba(theme.colors.green, 0.95)};
    transform: translateY(${open ? 0 : `-${theme.space[4]}`});
    opacity: ${open ? 1 : 0};
    overflow-y: scroll;
    pointer-events: ${open ? 'auto' : 'none'};
    transition: opacity 0.3s ease, transform 0.35s ease;

    &.hide {
      display: none;
    }
  `

  const closeIconStyles = css`
    position: absolute;
    top: ${theme.space[1]};
    left: 0;
    color: ${theme.colors.white};
    ${menuHover};
  `

  const focusOpenButton = () => {
    if (openButtonEl.current) openButtonEl.current.focus()
  }

  const toggleMenu = () => {
    setOpen(!open)
    noScroll.toggle()
  }

  const handleEscape = event => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      toggleMenu()
    }
  }

  return (
    <>
      <Button
        ref={openButtonEl}
        variant="reset"
        ariaLabel="Open the menu"
        ariaExpanded={open}
        ariaControls="navigation-menu"
        onClick={toggleMenu}
        p={3}
        css={openIconStyles}
      >
        <Hamburger ariaHidden="true" />
      </Button>

      <FocusTrap
        active={open}
        focusTrapOptions={{ onDeactivate: focusOpenButton }}
      >
        <Flex
          role="dialog"
          id="navigation-menu"
          ariaLabel="Navigation Menu"
          onKeyDown={handleEscape}
          alignItems="center"
          justifyContent="center"
          p={4}
          css={menuStyles}
        >
          <Button
            variant="reset"
            ariaLabel="Close the menu"
            ariaExpanded={open}
            ariaControls="navigation-menu"
            onClick={toggleMenu}
            tabIndex={open ? 0 : -1}
            p={3}
            css={closeIconStyles}
          >
            <Close ariaHidden="true" />
          </Button>

          <List
            textAlign="center"
            fontSize={3}
            fontFamily="sans-serif"
            fontWeight="medium"
          >
            <NavLink to="/" tabIndex={open ? 0 : -1}>
              Home
            </NavLink>

            <NavLink to="/videos/" tabIndex={open ? 0 : -1}>
              Videos
            </NavLink>

            <NavLink to="/about/" tabIndex={open ? 0 : -1}>
              Team
            </NavLink>

            <Button
              as={GatsbyLink}
              variant="outline-reverse"
              to="/lessons/"
              mt={4}
              tabIndex={open ? 0 : -1}
            >
              Book a Lesson
            </Button>
          </List>
        </Flex>
      </FocusTrap>
    </>
  )
}

MobileMenu.propTypes = {
  theme: PropTypes.object.isRequired,
}

export default withTheme(MobileMenu)
