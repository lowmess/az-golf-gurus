import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { Flex, Card } from 'rebass'
import Container from '../Container'
import SkipNavLink from './SkipNavLink'
import Logo from './Logo'
import { useMediaQuery } from '../../utils/hooks'
import MobileMenu from './MobileMenu'
import LinkList from './LinkList'

const Navigation = ({ theme }) => {
  const isMobile = !useMediaQuery(`(min-width: ${theme.breakpoints[0]})`)

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
          {isMobile && <MobileMenu />}

          <Logo py={[2, 0]} />

          {!isMobile && <LinkList />}
        </Flex>
      </Container>
    </Card>
  )
}

Navigation.propTypes = {
  theme: PropTypes.object.isRequired,
}

export default withTheme(Navigation)
