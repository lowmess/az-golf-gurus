import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { createGlobalStyle, withTheme } from 'styled-components'
import { useSiteMetadata } from '../utils/hooks'

import 'sanitize.css'
import '../fonts/geomanist/stylesheet.css'

const GlobalStyles = createGlobalStyle`
  scroll-behavior: smooth;

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.greens[1]} !important;
    color: ${({ theme }) => theme.colors.black} !important;
  }

  a {
    color: inherit;
    text-decoration: none;
    text-decoration-skip: ink;
    text-decoration-skip-ink: auto;
  }

  @media print {
    nav, footer {
      display: none !important;
    }

    #main-content {
      margin-bottom: 0 !important;
    }
  }
`

const Layout = ({ children, location, theme }) => {
  const { title, description } = useSiteMetadata()

  return (
    <>
      <GlobalStyles />

      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>{title}</title>

        <meta name="description" content={description} />
        {/* theming */}
        <meta name="theme-color" content={theme.colors.green} />
        <meta name="apple-mobile-web-app-title" content="{title}" />
        <meta name="application-name" content="{title}" />
        <meta name="msapplication-TileColor" content="{theme.colors.green}" />
        {/* icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color={theme.colors.green}
        />
      </Helmet>

      <main id="main-content">{children}</main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withTheme(Layout)
