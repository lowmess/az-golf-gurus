import React from 'react'
import PropTypes from 'prop-types'
import { Text } from 'rebass'

const MarkdownContent = ({ center, sx, children, ...props }) => (
  <Text
    sx={{
      textAlign: center ? 'center' : 'left',

      // Vertical rhythm
      '& > *': {
        // reset all margins
        marginTop: 0,
        marginBottom: 0,

        // margin top to all child elements
        '& + *': {
          marginTop: 3,
        },

        // bigger margin top on headers
        '& + h1, & + h2': {
          marginTop: 5,
        },

        '& + h3, & + h4': {
          marginTop: 5,
        },
      },

      'h1, h2, h3, h4, h5, h6': {
        lineHeight: 'title',
      },

      'p, ul, ol, dl, address': {
        maxWidth: '33em',
        marginRight: center ? 'auto' : 0,
        marginLeft: center ? 'auto' : 0,
      },

      // Headers
      h1: {
        fontSize: [3, 4],
        fontWeight: 'bold',
      },

      h2: {
        fontSize: [2, 3],
        fontWeight: 'medium',
      },

      h3: {
        fontSize: [1, 2],
        fontWeight: 'medium',
      },

      'h4, h5, h6': {
        fontSize: [0, 1],
        fontWeight: 'medium',
        textTransform: 'uppercase',
      },

      // Typographic Elements
      hr: {
        height: theme => theme.space[3],
        maxWidth: '40rem',
        marginRight: center ? 'auto' : 0,
        marginLeft: center ? 'auto' : 0,
        border: 0,
        backgroundColor: 'green',
      },

      'ul, ol, dl': {
        paddingLeft: 4,
      },

      'ul ul, ol ol, ul ol, ol ul': {
        marginTop: 0,
        marginBottom: 0,
      },

      'b, strong, em, small, code': {
        lineHeight: 1,
      },

      'sup, sub': {
        verticalAlign: 'baseline',
        position: 'relative',
        top: '-0.4em',
      },

      sub: {
        top: '0.4em',
      },

      'blockquote, details': {
        marginY: 4,
        marginX: 0,
        borderLeft: 4,
        borderColor: 'green',
        borderRadius: 1,
        padding: 3,
        backgroundColor: 'grays.2',

        p: {
          maxWidth: '30em',
        },

        '> :first-child': {
          marginTop: 0,
        },

        '> :last-child': {
          marginBottom: 0,
        },
      },

      // Links
      a: {
        color: 'inherit',
        textDecoration: 'underline',
        textDecorationColor: theme => theme.colors.green,

        '&:hover': {
          color: 'green',
        },

        '@media print': {
          '&:after': {
            content: `' (' attr(href) ')'`,
            fontSize: '0.875em',
          },

          "&[href^='/']::after": {
            content: `' (https://azgolfgurus.com' attr(href) ')'`,
          },

          "&[href^='#']": {
            textDecoration: 'none',

            '&:after': {
              content: `''`,
            },
          },
        },
      },

      // Images
      img: {
        display: 'block',
        width: '100%',
        maxWidth: '48rem',
        marginY: 4,
        marginX: center ? 'auto' : 0,
        borderRadius: 1,
      },

      ...sx,
    }}
    {...props}
  >
    {children}
  </Text>
)

MarkdownContent.propTypes = {
  center: PropTypes.boolean,
  sx: PropTypes.object,
  children: PropTypes.node.isRequired,
}

export default MarkdownContent
