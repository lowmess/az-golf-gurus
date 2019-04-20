import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import FocusTrap from 'focus-trap-react'
import styled, { withTheme } from 'styled-components'
import { rgba } from 'polished'
import { Flex, Text, Link, Button } from 'rebass'
import { List, ListItem } from '../Typography'
import { Close } from './Icons'
import { themeHover, reverseThemeHover } from '../../utils/styles'

const NavListItem = styled(ListItem)`
  & + & {
    border-top: ${({ theme }) =>
      `${theme.borders[2]} ${theme.colors.greens[6]}`};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: inline-block;

    & + & {
      border-top: 0;
    }
  }
`

const NavLinkText = styled(Text)`
  display: inline-block;
  ${reverseThemeHover};
  color: ${({ theme }) => theme.colors.white};

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    ${themeHover};
    color: ${({ theme }) => theme.colors.black};
    border-bottom: ${({ theme }) => theme.borders[3]} transparent;

    .active & {
      border-color: ${({ theme }) => theme.colors.green};
    }
  }
`

const Menu = styled(Flex)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: ${({ theme }) => rgba(theme.colors.greens[7], 0.95)};
  transform: translateY(
    ${({ theme, open, notMobile }) =>
      open || notMobile ? 0 : `-${theme.space[4]}`}
  );
  opacity: ${({ open, notMobile }) => (open || notMobile ? 1 : 0)};
  overflow-y: scroll;
  pointer-events: ${({ open, notMobile }) =>
    open || notMobile ? 'auto' : 'none'};
  transition: opacity 0.3s ease, transform 0.35s ease;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: contents;
  }
`

const CloseButton = styled(Button)`
  position: absolute;
  top: ${({ theme }) => theme.space[1]};
  left: 0;
  color: ${({ theme }) => theme.colors.white};
  ${reverseThemeHover};

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: none;
  }
`

const LinkList = ({
  theme,
  id,
  open,
  toggleMenu,
  focusOpenButton,
  notMobile,
  ...props
}) => {
  // NAVLINK
  // ===========================================================================
  // It's sort of cumbersome to have this defined here, but it means we don't
  // have to pass all sorts of props to _every_ link.
  const NavLink = ({ children, to, ...linkProps }) => {
    const isActive = ({ href, isCurrent, isPartiallyCurrent }) => {
      if (isCurrent && href === '/') {
        return { className: 'active' }
      } else if (isPartiallyCurrent && href !== '/') {
        return { className: 'active' }
      }

      return null
    }

    // Another annoying thing is that there's no way to set an active class
    // with `@reach/router` without overriding `styled-components`, uhh, styles.
    // So we have to have a nested span. Pretty cool.
    return (
      <NavListItem
        width={[1, 'auto']}
        fontFamily="geomanist"
        textAlign="center"
        {...linkProps}
      >
        <Link
          as={GatsbyLink}
          to={to}
          onClick={notMobile ? undefined : toggleMenu}
          tabIndex={open || notMobile ? 0 : -1}
          getProps={isActive}
          style={{ display: 'inline-block' }}
        >
          <NavLinkText as="span" py={3} px={2}>
            {children}
          </NavLinkText>
        </Link>
      </NavListItem>
    )
  }

  NavLink.propTypes = {
    children: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  }

  // LINKLIST
  // ===========================================================================
  const handleEscape = event => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      toggleMenu()
    }
  }

  return (
    <FocusTrap
      active={open}
      pause={notMobile}
      focusTrapOptions={{ onDeactivate: focusOpenButton }}
    >
      <Menu
        open={open}
        notMobile={notMobile}
        role={notMobile ? undefined : 'dialog'}
        id={notMobile ? undefined : id}
        aria-label={notMobile ? undefined : 'Navigation Menu'}
        onKeyDown={notMobile ? undefined : handleEscape}
        alignItems="center"
        justifyContent="center"
        p={4}
        color={['white', 'black']}
      >
        {!notMobile && (
          <CloseButton
            variant="reset"
            aria-label="Close the menu"
            aria-expanded={open}
            aria-controls={id}
            onClick={notMobile ? undefined : toggleMenu}
            tabIndex={open ? 0 : -1}
            p={3}
          >
            <Close ariaHidden="true" />
          </CloseButton>
        )}

        <Flex
          as={List}
          flexDirection={['column', 'row']}
          alignItems={['center', 'baseline']}
          justifyContent="center"
          fontSize={[3, 1]}
          fontWeight={['medium', 'normal']}
          css="height: 100%"
          {...props}
        >
          <NavLink to="/" mr={[0, 2]}>
            Home
          </NavLink>

          <NavLink to="/videos/" mr={[0, 2]}>
            Videos
          </NavLink>

          <NavLink to="/events/" mr={[0, 3]}>
            Events
          </NavLink>

          <ListItem>
            <Button
              variant={notMobile ? 'primary-small' : 'outline-reverse'}
              as={GatsbyLink}
              to="/lessons/"
              mt={[4, 0]}
              onClick={notMobile ? undefined : toggleMenu}
              tabIndex={open || notMobile ? 0 : -1}
            >
              Book a Lesson
            </Button>
          </ListItem>
        </Flex>
      </Menu>
    </FocusTrap>
  )
}

LinkList.propTypes = {
  theme: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  focusOpenButton: PropTypes.func.isRequired,
  notMobile: PropTypes.bool.isRequired,
}

export default withTheme(LinkList)
