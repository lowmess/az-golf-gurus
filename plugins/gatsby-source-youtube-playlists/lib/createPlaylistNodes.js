const { createRemoteFileNode } = require('gatsby-source-filesystem')

exports.createNodeIds = (items, createNodeId) =>
  items.map(item => {
    item.id = createNodeId(item.id)

    return item
  })

exports.downloadLocalThumbnails = ({
  items,
  store,
  cache,
  createNode,
  createNodeId,
}) =>
  Promise.all(
    items.map(async item => {
      let fileNode

      if (item.thumbnail && item.thumbnail.url) {
        try {
          fileNode = await createRemoteFileNode({
            url: item.thumbnail.url,
            store,
            cache,
            createNode,
            createNodeId,
          })
        } catch (error) {
          // noop
        }
      }

      if (fileNode) {
        item.localThumbnail___NODE = fileNode.id
      }

      if (item.videos && item.videos.length) {
        item.videos.map(async video => {
          let videoFileNode

          if (video.thumbnail && video.thumbnail.url) {
            try {
              videoFileNode = await createRemoteFileNode({
                url: video.thumbnail.url,
                store,
                cache,
                createNode,
                createNodeId,
              })
            } catch (error) {
              // noop
            }
          }

          if (videoFileNode) {
            video.localThumbnail___NODE = videoFileNode.id
          }
        })
      }

      return item
    })
  )

exports.createVideoNodes = (
  playlists,
  videos,
  createNode,
  createContentDigest
) => {
  videos.map(async video => {
    let playlistId = null

    playlists.forEach(playlist => {
      if (playlist.playlistId === video.playlistId) {
        playlistId = playlist.id
      }
    })

    await createNode({
      ...video,
      parent: null,
      playlist___NODE: playlistId,
      children: [],
      internal: {
        type: 'YouTubeVideo',
        contentDigest: createContentDigest(JSON.stringify(video)),
      },
    })
  })

  return videos
}

exports.createPlaylistNodes = (
  playlists,
  videos,
  createNode,
  createContentDigest
) => {
  playlists.map(async playlist => {
    const playlistVideos = []

    videos.forEach(video => {
      if (video.playlistId === playlist.playlistId) {
        playlistVideos.push(video.id)
      }
    })

    const node = await createNode({
      ...playlist,
      parent: null,
      children: [],
      videos___NODE: playlistVideos,
      internal: {
        type: 'YouTubePlaylist',
        contentDigest: createContentDigest(JSON.stringify(playlist)),
      },
    })

    return node
  })

  return playlists
}
