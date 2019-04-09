This is a Gatsby source plugin to retrieve a YouTube channel's playlists.

## Options

| Key         | Description                                  |
| ----------- | -------------------------------------------- |
| `channelId` | The YouTube channel ID to get playlists from |
| `apiKey`    | Your YouTube API Key                         |

## Schema

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
