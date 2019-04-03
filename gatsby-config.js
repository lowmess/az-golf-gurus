const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'development') {
  dotenv.config()
}

module.exports = {
  siteMetadata: {
    title: 'AZ Golf Gurus',
    description: 'Dedicated to growing the game of golf',
    siteUrl: 'https://www.azgolfgurus.com',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    // {
    //   resolve: 'gatsby-source-contentful',
    //   options: {

    //   },
    // },
    // {
    //   resolve: 'gatsby-source-youtube',
    //   options: {

    //   },
    // },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'AZ Golf Gurus',
        short_name: 'AZGG',
        start_url: '/',
        background_color: '#4db85c',
        theme_color: '#4db85c',
        display: 'minimal-ui',
        icons: [
          {
            src: '/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-layout',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-styled-components',
    // Should always be last plugin:
    'gatsby-plugin-netlify',
  ],
}
