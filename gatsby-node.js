const path = require('path')
const Promise = require('bluebird')
const _ = require('lodash')
const fetch = require('node-fetch')

const toSnakeCase = str =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, '-')

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
          allContentfulLessonCategory(
            filter: { title: { ne: "SCHEMA__LessonCategory" } }
          ) {
            edges {
              node {
                title
                lessons {
                  calendlyUrl
                  title
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.error(result.errors)
          reject(result.errors)
        }

        // Create YouTube playlist pages.
        _.each(result.data.allYouTubePlaylist.edges, edge => {
          createPage({
            path: edge.node.slug,
            component: Playlist,
            context: { slug: edge.node.slug },
          })
        })

        // Create lesson pages.
        _.each(result.data.allContentfulLessonCategory.edges, edge => {
          const baseUrl = `/lessons/${toSnakeCase(edge.node.title)}`

          _.each(edge.node.lessons, lesson => {
            const url = `${baseUrl}-${toSnakeCase(lesson.title)}/`

            createPage({
              path: url,
              component: Lesson,
              context: { calendlyUrl: lesson.calendlyUrl },
            })
          })
        })
      })
    )
  })
}
