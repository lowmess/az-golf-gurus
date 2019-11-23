/* global Calendly */

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Box } from 'rebass'
import Paragraph from './Paragraph'
import { useScript } from '../utils/hooks'

const CalendlyEmbed = ({ url, ...props }) => {
  const [loaded, error] = useScript(
    'https://assets.calendly.com/assets/external/widget.js'
  )

  useEffect(() => {
    // I got this method by running Prettier on `widget.js`.
    // If it stops working it's likely the method has changed.
    if (loaded && !error && typeof Calendly !== 'undefined') {
      Calendly._autoLoadInlineWidgets()
    }
  }, [loaded, error])

  if (error) {
    return (
      <Box
        sx={{
          border: 1,
          borderRadius: 2,
          paddingY: 2,
          paddingX: 3,
          backgroundColor: 'reds.0',
          color: 'reds.8',
          textAlign: 'center',
        }}
        {...props}
      >
        <Paragraph mx="auto">
          There was an error loading the scheduling widget. Please try
          again&nbsp;later.
        </Paragraph>
      </Box>
    )
  }

  return (
    <Box
      className="calendly-inline-widget"
      data-url={url}
      sx={{
        minWidth: '20rem',
        height: '40rem',
        border: 1,
        borderColor: 'grays.2',
      }}
      {...props}
    />
  )
}

CalendlyEmbed.propTypes = {
  url: PropTypes.string.isRequired,
}

export default CalendlyEmbed
