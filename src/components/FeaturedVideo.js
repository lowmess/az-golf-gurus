import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'
import { Box } from 'rebass'

const FeaturedVideo = ({ bg, ...props }) => {
  const styles = css`
    ${bg && `background-image: linear-gradient(to bottom, ${bg}, transparent)`};
  `

  return (
    <Box css={styles} {...props}>
      Video
    </Box>
  )
}

FeaturedVideo.propTypes = {
  bg: PropTypes.string,
}

export default FeaturedVideo
