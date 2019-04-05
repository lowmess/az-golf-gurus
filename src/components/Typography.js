import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'
import { Box, Text, Heading } from 'rebass'

const Title = ({ children, ...props }) => (
  <Heading
    as="h1"
    mb={3}
    fontSize={[4, 5]}
    fontFamily="geomanist"
    lineHeight="title"
    {...props}
  >
    {children}
  </Heading>
)

Title.propTypes = {
  children: PropTypes.node.isRequired,
}

const Subtitle = ({ children, ...props }) => (
  <Heading
    mt={3}
    mb={4}
    fontSize={[3, 4]}
    fontWeight="medium"
    fontFamily="geomanist"
    lineHeight="title"
    {...props}
  >
    {children}
  </Heading>
)

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
}

const Paragraph = ({ children, ...props }) => (
  <Text
    as="p"
    fontSize={[1, 2]}
    lineHeight="copy"
    css="max-width: 33em"
    {...props}
  >
    {children}
  </Text>
)

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
}

const Rule = props => {
  const styles = css`
    height: ${({ theme }) => theme.space[3]};
    max-width: 40rem;
    border: 0;
  `

  return <Box as="hr" mx={0} bg="green" css={styles} {...props} />
}

const List = ({ children, ...props }) => (
  <Text as="ul" m={0} p={0} css="list-style-type: none" {...props}>
    {children}
  </Text>
)

List.propTypes = {
  children: PropTypes.node.isRequired,
}

const ListItem = ({ children, ...props }) => (
  <Text as="li" {...props}>
    {children}
  </Text>
)

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
}

export { Title, Subtitle, Paragraph, Rule, List, ListItem }
