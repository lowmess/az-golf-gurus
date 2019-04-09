const path = require('path')
const Promise = require('bluebird')
const _ = require('lodash')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/Playlist.js')
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
            component: blogPost,
            context: { slug: edge.node.slug },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'YouTubePlaylist') {
    const value = createFilePath({
      node,
      getNode,
      basePath: 'src/pages/videos/',
    })
    createNodeField({
      name: 'slug',
      node,
      value,
    })
  }
}
