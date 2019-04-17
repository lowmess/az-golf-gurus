import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'
import { Box } from 'rebass'

const AspectRatio = ({ children, ratio, ...props }) => {
  const [x, y] = ratio.split(':')

  const styles = css`
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: ${(y / x) * 100}%;
    overflow: hidden;

    iframe {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  `

  return (
    <Box css={styles} {...props}>
      {children}
    </Box>
  )
}

AspectRatio.propTypes = {
  children: PropTypes.node.isRequired,
  ratio: (props, propName, componentName) => {
    if (typeof props[propName] !== 'string' || !props[propName].includes(':')) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
      )
    }
  },
}

AspectRatio.defaultProps = {
  ratio: '16:9',
}

export default AspectRatio
