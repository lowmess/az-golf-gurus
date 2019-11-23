import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import FocusTrap from 'focus-trap-react'
import { rgba } from 'polished'
import { Flex, Text, Button } from 'rebass'
import List from '../List'
import { Close } from './Icons'

const navLinkItemStyles = {
  display: ['list-item', 'inline-block'],
  width: [1, 'auto'],
  fontFamily: 'geomanist',
  textAlign: 'center',

  '& + &': {
    marginLeft: [0, 2],
    borderTop: [2, 0],
    borderColor: 'greens.6',
  },
}

const navLinkTextStyles = {
  display: 'inline-block',
  color: ['white', 'black'],
  borderBottom: [null, 3],
  borderColor: [null, 'transparent'],
  paddingY: 3,
  paddingX: 2,

  '&:hover': {
    color: ['light-green', 'green'],
  },

  '.active &': {
    borderColor: [null, 'green'],
  },
}

const menuStyles = {
  alignItems: 'center',
  justifyContent: 'center',
  display: ['block', 'contents'],
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  zIndex: '999',
  padding: 4,
  backgroundColor: theme => rgba(theme.colors.greens[7], 0.95),
  color: ['white', 'black'],
  opacity: 1,
  transform: 'translateY(0)',
  overflowY: 'scroll',
  pointerEvents: 'auto',
  transition: 'opacity 0.3s ease, transform 0.35s ease',

  '&.is-closed': {
    opacity: 0,
    transform: theme => `translateY(-${theme.space[4]})`,
    pointerEvents: 'none',
  },
}

const closeButtonStyles = {
  display: [null, 'none'],
  position: 'absolute',
  top: 1,
  left: 0,
  padding: 3,
  color: 'white',

  '&:hover': {
    color: 'light-green',
  },
}

const LinkList = ({
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
      <List.Item
        sx={navLinkItemStyles}
        width={[1, 'auto']}
        fontFamily="geomanist"
        textAlign="center"
        {...linkProps}
      >
        <Link
          to={to}
          onClick={notMobile ? undefined : toggleMenu}
          tabIndex={open || notMobile ? 0 : -1}
          getProps={isActive}
          style={{ display: 'inline-block' }}
        >
          <Text as="span" sx={navLinkTextStyles}>
            {children}
          </Text>
        </Link>
      </List.Item>
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
      <Flex
        open={open}
        notMobile={notMobile}
        role={notMobile ? undefined : 'dialog'}
        id={notMobile ? undefined : id}
        aria-label={notMobile ? undefined : 'Navigation Menu'}
        onKeyDown={notMobile ? undefined : handleEscape}
        className={!open && !notMobile ? 'is-closed' : null}
        sx={menuStyles}
      >
        {!notMobile && (
          <Button
            variant="reset"
            aria-label="Close the menu"
            aria-expanded={open}
            aria-controls={id}
            onClick={notMobile ? undefined : toggleMenu}
            tabIndex={open ? 0 : -1}
            sx={closeButtonStyles}
          >
            <Close ariaHidden="true" />
          </Button>
        )}

        <Flex
          as={List}
          sx={{
            flexDirection: ['column', 'row'],
            alignItems: ['center', 'baseline'],
            justifyContent: 'center',
            height: '100%',
            fontSize: [3, 1],
            fontWeight: ['medium', 'normal'],
          }}
          {...props}
        >
          <NavLink to="/">Home</NavLink>

          <NavLink to="/videos/">Videos</NavLink>

          <NavLink to="/events/">Events</NavLink>

          <List.Item marginLeft={[0, 3]}>
            <Button
              variant={notMobile ? 'primary-small' : 'outline-reverse'}
              as={Link}
              to="/lessons/"
              mt={[4, 0]}
              onClick={notMobile ? undefined : toggleMenu}
              tabIndex={open || notMobile ? 0 : -1}
            >
              Book a Lesson
            </Button>
          </List.Item>
        </Flex>
      </Flex>
    </FocusTrap>
  )
}

LinkList.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  focusOpenButton: PropTypes.func.isRequired,
  notMobile: PropTypes.bool.isRequired,
}

export default LinkList
