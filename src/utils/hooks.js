import { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const useSiteMetadata = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  return site.siteMetadata
}

const useMediaQuery = query => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    let mounted = true
    const queryList = window.matchMedia(query)

    const onChange = () => {
      setMatches(queryList.matches)
    }

    if (mounted) {
      queryList.addListener(onChange)
      setMatches(queryList.matches)
    }

    return () => {
      mounted = false
      queryList.removeListener(onChange)
    }
  }, [query])

  return matches
}

const useWindowWidth = () => {
  const isClient = typeof window === 'object'

  const getWidth = () => (isClient ? window.innerWidth : undefined)

  const [windowWidth, setWindowWidth] = useState(getWidth())

  useEffect(() => {
    if (typeof window !== 'object') return false

    const handleResize = () => {
      setWindowWidth(getWidth())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowWidth
}

export { useSiteMetadata, useMediaQuery, useWindowWidth }
