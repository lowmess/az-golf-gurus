This is a Gatsby source plugin to retrieve a YouTube channel's playlists.

**Schema:**

```graphql
{
  allYouTubePlaylist {
    edges {
      node {
        playlistId
        title
        description
        videos {
          videoId
          title
          description
        }
      }
    }
  }
}
```
