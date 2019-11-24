import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

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

List.Item = ListItem

export default List
