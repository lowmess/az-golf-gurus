import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { createGlobalStyle, withTheme } from 'styled-components'
import { Text } from 'rebass'
import Navigation from '../components/Navigation'
import { useSiteMetadata } from '../utils/hooks'

import 'sanitize.css'
import '../fonts/geomanist/stylesheet.css'

const GlobalStyles = createGlobalStyle`
  html{
  scroll-behavior: smooth;

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
}

  ::selection {
    background-color: ${({ theme }) => theme.colors.greens[3]} !important;
    color: ${({ theme }) => theme.colors.black} !important;
  }

  a {
    color: inherit;
    text-decoration: none;
    text-decoration-skip: ink;
    text-decoration-skip-ink: auto;
    transition: all 0.2s ease;
  }

  button, [role="button"], [type="button"], [type="submit"], [type="reset"] {
    cursor: pointer;
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
        <meta name="msapplication-TileColor" content="#00a300" />
        {/* icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Helmet>

      <Text fontFamily="serif" lineHeight="copy" color="black">
        <Navigation location={location} />

        <main id="main-content">{children}</main>
      </Text>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withTheme(Layout)
