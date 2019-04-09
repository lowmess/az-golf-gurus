import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Container from '../components/Container'

const PlaylistTemplate = ({ data }) => {
  const { title, videos } = data.youTubePlaylist

  return (
    <Container>
      <h1>{title}</h1>

      {videos.map(video => {
        return <p key={video.videoId}>{video.title}</p>
      })}
    </Container>
  )
}

PlaylistTemplate.propTypes = {
  data: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query PlaylistBySlug($slug: String!) {
    youTubePlaylist(slug: { eq: $slug }) {
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
`

export default PlaylistTemplate
