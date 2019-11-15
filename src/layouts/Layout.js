import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { useTheme } from 'emotion-theming'
import { Box, Flex } from 'rebass'
import ThemeProvider from './ThemeProvider'
import GlobalStyles from './GlobalStyles'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { useSiteMetadata } from '../utils/hooks'

const Head = () => {
  const { title, description } = useSiteMetadata()
  const theme = useTheme()

  return (
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <title>{title}</title>

      <meta name="description" content={description} />
      {/* theming */}
      <meta name="theme-color" content={theme.colors.green} />
      <meta name="apple-mobile-web-app-title" content={title} />
      <meta name="application-name" content={title} />
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
  )
}

const Layout = ({ children }) => {
  return (
    <ThemeProvider>
      <Head />

      <GlobalStyles />

      <Flex flexDirection="column" sx={{ minHeight: '100vh' }}>
        <Navigation />

        <Box as="main" id="main-content" flex="1">
          {children}
        </Box>

        <Footer />
      </Flex>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.object.isRequired,
}

export default Layout
