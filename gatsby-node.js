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
    const Lesson = path.resolve('./src/templates/Lesson.js')
    const Event = path.resolve('./src/templates/Event.js')

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
          allContentfulLesson(filter: { title: { ne: "SCHEMA__Lesson" } }) {
            edges {
              node {
                contentful_id
              }
            }
          }
          allContentfulEvent(filter: { title: { ne: "SCHEMA__Event" } }) {
            edges {
              node {
                contentful_id
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }

        // Create YouTube playlist pages
        _.each(result.data.allYouTubePlaylist.edges, edge => {
          createPage({
            path: edge.node.slug,
            component: Playlist,
            context: { slug: edge.node.slug },
          })
        })

        // Create lesson pages
        _.each(result.data.allContentfulLesson.edges, edge => {
          createPage({
            path: `/lessons/${edge.node.contentful_id}/`,
            component: Lesson,
            context: { contentful_id: edge.node.contentful_id },
          })
        })

        // Create event pages
        _.each(result.data.allContentfulEvent.edges, edge => {
          createPage({
            path: `/events/${edge.node.contentful_id}/`,
            component: Event,
            context: { contentful_id: edge.node.contentful_id },
          })
        })
      })
    )
  })
}
