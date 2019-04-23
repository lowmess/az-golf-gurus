import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import noScroll from 'no-scroll'
import styled, { withTheme } from 'styled-components'
import { Flex, Button, Card } from 'rebass'
import Container from '../Container'
import SkipNavLink from './SkipNavLink'
import Logo from './Logo'
import LinkList from './LinkList'
import { Hamburger } from './Icons'
import { useMediaQuery } from '../../utils/hooks'
import { themeHover } from '../../utils/styles'

const OpenButton = styled(Button)`
  position: absolute;
  left: 0;
  ${themeHover};

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    display: none;
  }
`

const Navigation = ({ theme }) => {
  const [open, setOpen] = useState(false)
  const openButtonEl = useRef(null)
  const notMobile = useMediaQuery(`(min-width: ${theme.breakpoints[0]})`)
  const menuId = 'navigation-menu'

  const toggleMenu = () => {
    setOpen(!open)
    noScroll.toggle()
  }

  const focusOpenButton = () => {
    if (openButtonEl.current) openButtonEl.current.focus()
  }

  return (
    <Card
      as="header"
      boxShadow="0 -0.25rem 0.5rem 0.125rem rgba(0, 0, 0, 0.25)"
      css="position: relative"
    >
      <SkipNavLink />

      <Container>
        <Flex
          as="nav"
          alignItems="center"
          justifyContent={['center', 'space-between']}
        >
          {!notMobile && (
            <OpenButton
              ref={openButtonEl}
              variant="reset"
              aria-label="Open the menu"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={toggleMenu}
              p={3}
            >
              <Hamburger ariaHidden="true" />
            </OpenButton>
          )}

          <Logo
            py={[2, 0]}
            tabIndex={notMobile ? -1 : 0}
            aria-hidden={notMobile ? true : undefined}
          />

          <LinkList
            id={menuId}
            open={open}
            toggleMenu={toggleMenu}
            focusOpenButton={focusOpenButton}
            notMobile={notMobile}
          />
        </Flex>
      </Container>
    </Card>
  )
}

Navigation.propTypes = {
  theme: PropTypes.object.isRequired,
}

export default withTheme(Navigation)
