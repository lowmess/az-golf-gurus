import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'
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

const Header = ({ hideRule, children, ...props }) => {
  const separatorStyles = hideRule
    ? css`
        display: none;

        @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
          display: block;
        }
      `
    : ''

  const gradient = css`
    background-image: linear-gradient(
      to bottom,
      ${({ theme }) => theme.colors.greens[0]},
      transparent
    );
  `

  return (
    <Text textAlign="center" css={gradient} {...props}>
      <Container pt={5}>
        {children}

        <Separator mt={5} mx="auto" css={separatorStyles} />
      </Container>
    </Text>
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
