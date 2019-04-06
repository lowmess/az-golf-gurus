import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { keyframes, createGlobalStyle, withTheme } from 'styled-components'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useSiteMetadata } from '../utils/hooks'

import 'sanitize.css'
import '../fonts/geomanist/stylesheet.css'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const GlobalStyles = createGlobalStyle`
  html {
    scroll-behavior: smooth;

    @media (prefers-reduced-motion: reduce) {
      scroll-behavior: auto;
    }
  }

  body {
    font-family: ${({ theme }) => theme.fonts.georgia};
    color: ${({ theme }) => theme.colors.black};
    line-height: ${({ theme }) => theme.lineHeights.copy};
    opacity: 0;
    animation: ${fadeIn} 1s ease 0.25s 1 normal forwards running;
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

  svg {
    max-width: 100%;
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

const Layout = ({ children, theme }) => {
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

      <Navigation />

      <main id="main-content">{children}</main>

      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withTheme(Layout)
