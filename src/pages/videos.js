import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Container from '../components/Container'

const VideosPage = () => {
  const { allYouTubePlaylist: data } = useStaticQuery(graphql`
    query {
      allYouTubePlaylist {
        edges {
          node {
            playlistId
            slug
            title
            description
          }
        }
      }
    }
  `)

  return (
    <Container>
      {data.edges.map(edge => {
        const { playlistId, title, slug } = edge.node

        return (
          <Link
            key={playlistId}
            to={slug}
            css="display: block; margin: 2rem 0;"
          >
            {title}
          </Link>
        )
      })}
    </Container>
  )
}

export default VideosPage
