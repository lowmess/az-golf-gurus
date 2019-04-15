import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'
import { Box, Text, Heading as H } from 'rebass'

const Heading = ({ children, ...props }) => (
  <H
    fontSize={[3, 4]}
    fontFamily="geomanist"
    fontWeight="medium"
    lineHeight="title"
    {...props}
  >
    {children}
  </H>
)

Heading.propTypes = {
  children: PropTypes.node.isRequired,
}

const Paragraph = ({ children, ...props }) => (
  <Text
    as="p"
    m={0}
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

const Separator = props => {
  const styles = css`
    height: ${({ theme }) => theme.space[3]};
    max-width: 40rem;
    border: 0;
  `

  return <Box as="hr" mx={0} bg="green" css={styles} {...props} />
}

const Rule = props => {
  const styles = css`
    height: 1px;
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

export { Heading, Paragraph, Separator, Rule, List, ListItem }
