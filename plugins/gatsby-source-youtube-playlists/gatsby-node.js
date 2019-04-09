const getPlaylists = require('./lib/getPlaylists')

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest },
  { plugins, ...options }
) => {
  const { channelId, apiKey } = options

  const playlists = await getPlaylists(channelId, apiKey)

  playlists.forEach(playlist => {
    createNode({
      ...playlist,
      id: createNodeId(`yt-playlist-${playlist.playlistId}`),
      parent: null,
      children: [],
      internal: {
        type: 'YouTubePlaylist',
        content: JSON.stringify(playlist),
        contentDigest: createContentDigest(playlist),
      },
    })
  })
}
