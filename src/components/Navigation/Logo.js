import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { withTheme } from 'styled-components'
import { Box } from 'rebass'

const Logo = ({ theme, ...props }) => (
  <Box as={Link} to="/" {...props}>
    <svg
      viewBox="0 0 1000 228"
      xmlns="http://www.w3.org/2000/svg"
      width="140"
      height="32"
      preserveAspectRatio="xMinYMid"
    >
      <title>Go to homepage</title>
      <path
        d="M421.763.675c-40.368-4.849-44.83 18.272-85.478 12.194v65.78c42.534 4.654 48.71-16.188 85.478-12.194V.675z"
        fill={theme.colors.red}
      />
      <path
        d="M227.618 218.878c8.251 4.565 21.068 8.427 33.709 8.427 27.038 0 49.335-11.06 49.335-45.297v-80.235h-22.824v9.656c-2.634-3.511-11.939-11.938-27.389-11.938-26.16 0-44.77 20.015-44.77 48.281 0 28.267 17.381 48.106 43.892 48.106 15.977 0 24.931-9.13 26.862-11.763v4.214c0 14.221-12.114 18.26-25.282 18.26-12.64 0-23.175-4.741-26.16-6.321l-7.373 18.61zm59.518-71.281c0 16.328-9.481 26.862-23.527 26.862-13.694 0-23.526-10.71-23.526-26.862 0-16.153 9.656-26.687 23.35-26.687 14.222 0 23.703 11.061 23.703 26.687zM322.891 147.948c0 27.74 20.717 47.93 49.335 47.93 28.794 0 49.51-20.19 49.51-47.93s-21.419-48.457-49.51-48.457c-27.915 0-49.335 20.541-49.335 48.457zm24.229 0c0-15.801 10.534-27.038 25.106-27.038 14.572 0 25.282 11.412 25.282 27.038s-10.71 26.51-25.282 26.51c-14.397 0-25.106-10.884-25.106-26.51zM433.966.641h24.229v192.953h-24.229zM480.255 193.596h24.229v-72.16h15.977v-19.663h-15.977v-2.81c0-8.075 4.39-11.938 12.816-11.938 2.107 0 4.214.351 4.74.351V67.01c-1.755-.175-4.388-.35-7.9-.35-17.908 0-33.885 7.9-33.885 31.777v3.336h-9.832v19.664h9.832v72.159zM582.648 218.878c8.252 4.565 21.068 8.427 33.71 8.427 27.037 0 49.334-11.06 49.334-45.297v-80.235h-22.824v9.656c-2.633-3.511-11.938-11.938-27.389-11.938-26.16 0-44.77 20.015-44.77 48.281 0 28.267 17.382 48.106 43.893 48.106 15.976 0 24.93-9.13 26.862-11.763v4.214c0 14.221-12.115 18.26-25.282 18.26-12.641 0-23.175-4.741-26.16-6.321l-7.374 18.61zm59.518-71.281c0 16.328-9.48 26.862-23.526 26.862-13.695 0-23.527-10.71-23.527-26.862 0-16.153 9.657-26.687 23.351-26.687 14.221 0 23.702 11.061 23.702 26.687zM713.08 195.878c11.94 0 20.718-6.671 24.58-12.992v10.71h23.702v-91.823h-24.229v55.129c0 9.832-6.32 17.206-16.327 17.206-8.252 0-15.275-6.32-15.275-16.504v-55.831h-24.229v53.022c0 19.488 5.619 41.083 31.778 41.083zM825.955 99.49c-12.114 0-21.244 6.497-25.282 15.626v-13.343h-23.702v91.823H801.2v-40.03c0-18.26 6.671-29.496 24.755-29.496V99.49zM869.962 195.878c11.939 0 20.717-6.671 24.58-12.992v10.71h23.701v-91.823h-24.228v55.129c0 9.832-6.32 17.206-16.328 17.206-8.252 0-15.275-6.32-15.275-16.504v-55.831h-24.228v53.022c0 19.488 5.618 41.083 31.778 41.083zM964.709 195.878c19.839 0 35.29-11.236 35.29-29.144 0-32.832-43.542-25.809-43.542-40.381 0-4.565 3.862-7.374 9.48-7.374 8.604 0 13.695 5.267 16.504 8.778l15.977-11.938c-4.39-7.199-14.046-16.328-31.427-16.328-18.786 0-33.358 10.183-33.358 27.213 0 32.656 43.366 27.213 43.366 41.259 0 5.267-4.39 8.252-11.237 8.252-10.359 0-16.504-4.74-21.068-10.008l-14.221 12.641c4.915 7.9 16.152 17.03 34.236 17.03zM-.001 165.12c0 19.336 15.82 30.762 34.454 30.762 10.547 0 17.579-3.164 22.325-8.262l1.582 5.977h21.446V135.41c0-20.567-8.79-36.036-38.322-36.036-14.063 0-27.95 5.274-36.212 10.899l9.141 16.524c6.856-3.516 15.294-6.504 24.435-6.504 10.722 0 16.7 5.449 16.7 13.535v5.977c-3.34-2.285-10.548-5.098-19.865-5.098C14.237 134.708 0 147.013 0 165.119zm24.258-.704c0-7.559 6.504-12.832 15.821-12.832s15.997 4.746 15.997 12.832c0 7.735-6.68 12.657-15.821 12.657s-15.997-5.098-15.997-12.657zM165.637 116.778V101.66H95.323v20.216h40.255l-41.486 56.779v14.942h72.073V173.38h-42.013l41.485-56.603z"
        fill={theme.colors.green}
        fillRule="nonzero"
      />
    </svg>
  </Box>
)

Logo.propTypes = {
  theme: PropTypes.object.isRequired,
}

export default withTheme(Logo)
