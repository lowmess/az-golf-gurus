/* global Calendly */

import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'rebass'
import { Paragraph } from './Typography'
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
      <Card
        bg="reds.0"
        border="1"
        borderColor="reds.3"
        borderRadius="2"
        py={2}
        px={3}
        color="reds.8"
        css="text-align: center;"
        {...props}
      >
        <Paragraph mx="auto">
          There was an error loading the scheduling widget. Please try
          again&nbsp;later.
        </Paragraph>
      </Card>
    )
  }

  return (
    <Card
      className="calendly-inline-widget"
      data-url={url}
      style={{ minWidth: '20rem', height: '40rem' }}
      border={1}
      borderColor="grays.2"
      {...props}
    />
  )
}

CalendlyEmbed.propTypes = {
  url: PropTypes.string.isRequired,
}

export default CalendlyEmbed
