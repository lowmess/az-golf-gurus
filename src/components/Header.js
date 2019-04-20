import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text } from 'rebass'
import { Heading, Paragraph, Separator } from './Typography'
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

const Gradient = styled(Text)`
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.greens[0]},
    transparent
  );
`

const Rule = styled(Separator)`
  ${({ theme, hideRule }) =>
    hideRule
      ? `
        display: none;

        @media (min-width: ${theme.breakpoints[0]}) {
          display: block;
        }
      `
      : ''}
`

const Header = ({ hideRule, children, ...props }) => {
  return (
    <Gradient textAlign="center" {...props}>
      <Container pt={5}>
        {children}

        <Rule hideRule={hideRule} mt={5} />
      </Container>
    </Gradient>
  )
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  hideRule: PropTypes.bool.isRequired,
}

Header.defaultProps = {
  hideRule: false,
}

export { Header, HeaderTitle, HeaderDescription }
