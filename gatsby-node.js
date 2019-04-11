const path = require('path')
const Promise = require('bluebird')
const _ = require('lodash')
const fetch = require('node-fetch')

const getFeaturedVideoId = () =>
  fetch(
    `https://cdn.contentful.com/spaces/${
      process.env.CONTENTFUL_SPACE_ID
    }/entries?content_type=homePageVideo&fields.entryTitle[ne]=SCHEMA__HomePageVideo&access_token=${
      process.env.CONTENTFUL_ACCESS_TOKEN
    }`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }

      return response.json()
    })
    .then(data => {
      return data.items[0].fields.videoId
    })
    .catch(error => {
      console.error(error.message)
    })

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (page.path === '/') {
    const featuredVideoId = await getFeaturedVideoId()

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
