import React, { useState, useEffect, useRef } from 'react'
import noScroll from 'no-scroll'
import { useTheme } from 'emotion-theming'
import { Box, Flex, Button } from 'rebass'
import Container from '../Container'
import { useMediaQuery } from '../../utils/hooks'
import SkipNavLink from './SkipNavLink'
import Logo from './Logo'
import LinkList from './LinkList'
import { Hamburger } from './Icons'

const openButtonStyles = {
  display: [null, 'none'],
  position: 'absolute',
  left: 0,

  '&:hover': {
    color: 'green',
  },
}

const Navigation = () => {
  const [open, setOpen] = useState(false)
  const openButtonEl = useRef(null)
  const theme = useTheme()
  const notMobile = useMediaQuery(`(min-width: ${theme.breakpoints[0]})`)
  const menuId = 'navigation-menu'

  const toggleMenu = () => {
    setOpen(!open)
    noScroll.toggle()
  }

  const focusOpenButton = () => {
    if (openButtonEl.current) openButtonEl.current.focus()
  }

  useEffect(() => {
    if (notMobile) {
      noScroll.off()
    } else if (open && !notMobile) {
      noScroll.on()
    }

    return () => {
      noScroll.off()
    }
  }, [open, notMobile])

  return (
    <Box
      as="header"
      sx={{
        position: 'relative',
        boxShadow: '0 -0.25rem 0.5rem 0.125rem rgba(0, 0, 0, 0.25)',
      }}
    >
      <SkipNavLink />

      <Container>
        <Flex
          as="nav"
          alignItems="center"
          justifyContent={['center', 'space-between']}
        >
          {!notMobile && (
            <Button
              ref={openButtonEl}
              variant="reset"
              aria-label="Open the menu"
              aria-expanded={open}
              aria-controls={menuId}
              onClick={toggleMenu}
              sx={openButtonStyles}
            >
              <Hamburger ariaHidden="true" />
            </Button>
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
    </Box>
  )
}

export default Navigation
