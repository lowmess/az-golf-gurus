const path = require('path')
const Promise = require('bluebird')
const _ = require('lodash')
const contentful = require('contentful')
const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

let featuredVideoId

client
  .getEntries({
    'fields.entryTitle[ne]': 'SCHEMA__HomePageVideo',
    content_type: 'homePageVideo',
  })
  .then(response => {
    if (response.items[0]) {
      featuredVideoId = response.items[0].fields.videoId
    }
  })
  .catch(error => {
    console.error(error.message)
  })

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (page.path === '/' && featuredVideoId) {
    deletePage(page)

    createPage({
      ...page,
      context: {
        featuredVideoId,
      },
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const Playlist = path.resolve('./src/templates/Playlist.js')

    resolve(
      graphql(`
        {
          allYouTubePlaylist {
            edges {
              node {
                slug
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        _.each(result.data.allYouTubePlaylist.edges, edge => {
          createPage({
            path: edge.node.slug,
            component: Playlist,
            context: { slug: edge.node.slug },
          })
        })
      })
    )
  })
}
