import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text } from 'rebass'

const Paragraph = ({ children, ...props }) => (
  <Text as="p" variant="paragraph" {...props}>
    {children}
  </Text>
)

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
}

const Separator = props => (
  <Box
    as="hr"
    sx={{
      height: theme => theme.space[3],
      maxWidth: '40rem',
      marginY: 0,
      marginX: 'auto',
      border: 0,
      backgroundColor: 'green',
    }}
    {...props}
  />
)

const Rule = props => (
  <Box
    as="hr"
    sx={{
      height: '1px',
      margin: 0,
      border: 0,
      backgroundColor: 'green',
    }}
    {...props}
  />
)

const List = ({ children, ...props }) => (
  <Text as="ul" variant="list" {...props}>
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

export { Paragraph, Separator, Rule, List, ListItem }
