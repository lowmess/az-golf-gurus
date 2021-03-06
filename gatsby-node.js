const path = require('path')
const fetch = require('node-fetch')

// Used to only display events that take place in the future. Since we rebuild
// the site every day with a webhook, we can just create a new `Date` object
// on every build instead of filtering on the client.
const today = new Date().toISOString()

const getFeaturedVideoId = () =>
  fetch(
    `https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/entries?content_type=homePageVideo&fields.entryTitle[ne]=SCHEMA__HomePageVideo&access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`
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

  if (page.path === '/events/') {
    deletePage(page)

    createPage({
      ...page,
      context: {
        today,
      },
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const Playlist = path.resolve('./src/templates/Playlist.jsx')
  const Lesson = path.resolve('./src/templates/Lesson.jsx')
  const Event = path.resolve('./src/templates/Event.jsx')

  const result = await graphql(
    `
      query createPages($today: Date) {
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

        allContentfulEvent(
          filter: { title: { ne: "SCHEMA__Event" }, startDate: { gt: $today } }
        ) {
          edges {
            node {
              contentful_id
            }
          }
        }
      }
    `,
    { today }
  )

  if (result.errors) {
    console.error(result.errors)
    return false
  }

  // Create YouTube playlist pages
  result.data.allYouTubePlaylist.edges.forEach(edge => {
    createPage({
      path: edge.node.slug,
      component: Playlist,
      context: { slug: edge.node.slug },
    })
  })

  // Create lesson pages
  result.data.allContentfulLesson.edges.forEach(edge => {
    createPage({
      path: `/lessons/${edge.node.contentful_id}/`,
      component: Lesson,
      context: { contentful_id: edge.node.contentful_id },
    })
  })

  // Create event pages
  result.data.allContentfulEvent.edges.forEach(edge => {
    createPage({
      path: `/events/${edge.node.contentful_id}/`,
      component: Event,
      context: { contentful_id: edge.node.contentful_id },
    })
  })
}
