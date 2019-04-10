/* eslint-disable no-console */

const fetch = require('./fetchWithTimeout')

const toSnakeCase = str =>
  str
    .toLowerCase()
    .replace(/[^a-z]+/g, ' ')
    .trim()
    .replace(/\s+/g, '-')

const getBiggestThumbnailObject = thumbnails =>
  Object.values(thumbnails).reduce(
    (prev, next) => (prev.width > next.width ? prev : next),
    {}
  )

// Define some common options
const fetchOptions = { headers: { Accept: 'application/json' } }

const errorCatcher = error => {
  console.error(error.message ? error.message : error)
  process.exit(1)
}

// Get all playlists from a channel
const getChannelPlaylists = async (channelId, apiKey) => {
  console.log(`\nRequesting playlists from channel ${channelId}\n`)

  const uri = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&maxResults=50&channelId=${channelId}&key=${apiKey}`

  try {
    const response = await fetch(uri, fetchOptions)
    const data = await response.json()

    // We're using a `Set` to make sure that each item is unique. It already
    // _should_ be, but this is another layer of security (duplicates will
    // cause the schema to goof up). We convert the `Set` to an array before
    // returning it. Also I'm using this same technique in the other resolvers.
    const playlists = new Set()

    if (data.items && data.items.length) {
      data.items.forEach(item => {
        if (item.kind === 'youtube#playlist') {
          const biggestThumbnail = getBiggestThumbnailObject(
            item.snippet.thumbnails
          )

          playlists.add({
            id: item.id,
            playlistId: item.id,
            slug: `/videos/${toSnakeCase(item.snippet.title)}/`,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: {
              url: biggestThumbnail.url,
              width: biggestThumbnail.width,
              height: biggestThumbnail.height,
            },
          })
        }
      })
    }

    return Array.from(playlists)
  } catch (error) {
    errorCatcher(error)
  }
}

// Get the first 50 videos in a channel. If we need to up this limit, we can
// recursively fetch the videos. Don't see that happening though.
const getPlaylistVideos = async (playlistId, apiKey) => {
  console.log(`\nRequesting videos from playlist ${playlistId}\n`)

  const uri = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`

  try {
    const response = await fetch(uri, fetchOptions)
    const data = await response.json()

    const videos = new Set()

    if (data.items && data.items.length) {
      data.items.forEach(item => {
        if (item.snippet.resourceId.kind === 'youtube#video') {
          const biggestThumbnail = getBiggestThumbnailObject(
            item.snippet.thumbnails
          )

          videos.add({
            id: item.snippet.resourceId.videoId,
            videoId: item.snippet.resourceId.videoId,
            playlistId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: {
              url: biggestThumbnail.url,
              width: biggestThumbnail.width,
              height: biggestThumbnail.height,
            },
          })
        }
      })
    }

    return Array.from(videos)
  } catch (error) {
    errorCatcher(error)
  }
}

// For each playlist in a channel, return an object containing the playlist's
// title, description, id, and the videos inside the playlist
const getPlaylists = async (channelId, apiKey) => {
  try {
    const playlists = await getChannelPlaylists(channelId, apiKey)

    const videos = new Set()

    // `.forEach` cannot take an async callback. However, the body of a
    // `for...of` has no such limitation
    for (const playlist of playlists) {
      try {
        const playlistVideos = await getPlaylistVideos(
          playlist.playlistId,
          apiKey
        )

        // only return the playlist if it has videos
        if (playlistVideos.length) {
          playlistVideos.forEach(video => {
            videos.add(video)
          })
        }
      } catch (error) {
        errorCatcher(error)
      }
    }

    return { playlists, videos: Array.from(videos) }
  } catch (error) {
    errorCatcher(error)
  }
}

module.exports = getPlaylists
