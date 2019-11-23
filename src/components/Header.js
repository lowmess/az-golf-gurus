import React from 'react'
import PropTypes from 'prop-types'
import { rgba } from 'polished'
import { Box, Heading } from 'rebass'
import Paragraph from './Paragraph'
import Container from './Container'
import MarkdownContent from './MarkdownContent'

const HeaderTitle = ({ children, ...props }) => (
  <Heading as="h1" fontSize={[4, 5]} fontWeight={['medium', 'bold']} {...props}>
    {children}
  </Heading>
)

HeaderTitle.propTypes = {
  children: PropTypes.string.isRequired,
}

const HeaderDescription = ({ markdown, children, ...props }) =>
  markdown ? (
    <MarkdownContent
      mt={4}
      fontSize={[1, 2]}
      center
      dangerouslySetInnerHTML={{
        __html: children,
      }}
      {...props}
    />
  ) : (
    <Paragraph mt={4} fontSize={[1, 2]} {...props}>
      {children}
    </Paragraph>
  )

HeaderDescription.propTypes = {
  markdown: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
}

HeaderDescription.defaultProps = {
  markdown: false,
}

const Header = ({ hideRule, children, ...props }) => {
  return (
    <Box
      sx={{
        backgroundImage: theme =>
          `linear-gradient(to bottom, ${theme.colors.greens[0]}, ${rgba(
            theme.colors.greens[0],
            0
          )})`,
        textAlign: 'center',
      }}
      {...props}
    >
      <Container pt={5}>
        {children}

        <Box
          variant="separator"
          sx={{ display: hideRule ? ['none', 'block'] : null }}
          mt={5}
        />
      </Container>
    </Box>
  )
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  hideRule: PropTypes.bool.isRequired,
}

Header.defaultProps = {
  hideRule: false,
}

Header.Title = HeaderTitle
Header.Description = HeaderDescription

export default Header
