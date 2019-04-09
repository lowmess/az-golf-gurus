const path = require('path')
const Promise = require('bluebird')
const _ = require('lodash')

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
