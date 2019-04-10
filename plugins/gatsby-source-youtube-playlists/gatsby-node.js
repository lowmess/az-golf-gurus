const getPlaylists = require('./lib/getPlaylists')
const {
  createNodeIds,
  downloadLocalThumbnails,
  createVideoNodes,
  createPlaylistNodes,
} = require('./lib/createPlaylistNodes')

exports.sourceNodes = async (
  {
    actions: { createNode, createNodeField },
    createNodeId,
    createContentDigest,
    store,
    cache,
  },
  { plugins, ...options }
) => {
  const { channelId, apiKey } = options

  let { playlists, videos } = await getPlaylists(channelId, apiKey)

  playlists = createNodeIds(playlists, createNodeId)
  videos = createNodeIds(videos, createNodeId)

  playlists = await downloadLocalThumbnails({
    items: playlists,
    store,
    cache,
    createNode,
    createNodeId,
  })
  videos = await downloadLocalThumbnails({
    items: videos,
    store,
    cache,
    createNode,
    createNodeId,
  })

  await createVideoNodes(playlists, videos, createNode, createContentDigest)
  createPlaylistNodes(playlists, videos, createNode, createContentDigest)
}
