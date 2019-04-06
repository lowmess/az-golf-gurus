import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import FocusTrap from 'focus-trap-react'
import { css, withTheme } from 'styled-components'
import { rgba } from 'polished'
import { Flex, Button } from 'rebass'
import { List, ListItem } from '../Typography'
import NavLink from './NavLink'
import { Close } from './icons'
import { reverseThemeHover } from '../../utils/styles'

const LinkList = ({
  theme,
  id,
  open,
  toggleMenu,
  focusOpenButton,
  notMobile,
  ...props
}) => {
  const containerStyles = css`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: ${rgba(theme.colors.greens[7], 0.95)};
    transform: translateY(${open || notMobile ? 0 : `-${theme.space[4]}`});
    opacity: ${open || notMobile ? 1 : 0};
    overflow-y: scroll;
    pointer-events: ${open || notMobile ? 'auto' : 'none'};
    transition: opacity 0.3s ease, transform 0.35s ease;

    @media (min-width: ${theme.breakpoints[0]}) {
      display: contents;
    }
  `

  const closeIconStyles = css`
    position: absolute;
    top: ${theme.space[1]};
    left: 0;
    color: ${theme.colors.white};
    ${reverseThemeHover};

    @media (min-width: ${theme.breakpoints[0]}) {
      display: none;
    }
  `

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
        role={notMobile ? undefined : 'dialog'}
        id={notMobile ? undefined : id}
        aria-label={notMobile ? undefined : 'Navigation Menu'}
        onKeyDown={notMobile ? undefined : handleEscape}
        alignItems="center"
        justifyContent="center"
        p={4}
        color={['white', 'black']}
        css={containerStyles}
      >
        {!notMobile && (
          <Button
            variant="reset"
            aria-label="Close the menu"
            aria-expanded={open}
            aria-controls={id}
            onClick={toggleMenu}
            tabIndex={open ? 0 : -1}
            p={3}
            css={closeIconStyles}
          >
            <Close ariaHidden="true" />
          </Button>
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
          <NavLink to="/" mr={[0, 2]} tabIndex={open || notMobile ? 0 : -1}>
            Home
          </NavLink>

          <NavLink
            to="/videos/"
            mr={[0, 2]}
            tabIndex={open || notMobile ? 0 : -1}
          >
            Videos
          </NavLink>

          <NavLink
            to="/events/"
            mr={[0, 3]}
            tabIndex={open || notMobile ? 0 : -1}
          >
            Events
          </NavLink>

          <ListItem>
            <Button
              variant={notMobile ? 'primary-small' : 'outline-reverse'}
              as={GatsbyLink}
              to="/lessons/"
              mt={[4, 0]}
              tabIndex={open || notMobile ? 0 : -1}
            >
              Book a Lesson
            </Button>
          </ListItem>
        </Flex>
      </Flex>
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
