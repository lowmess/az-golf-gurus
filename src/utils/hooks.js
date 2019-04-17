import { useState, useEffect, useCallback } from 'react'
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
  const isClient = typeof window === 'object'
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (!isClient) return false

    const queryList = window.matchMedia(query)

    const onChange = () => {
      setMatches(queryList.matches)
    }

    queryList.addListener(onChange)

    setMatches(queryList.matches)

    return () => {
      queryList.removeListener(onChange)
    }
  }, [query, isClient])

  return matches
}

const useWindowWidth = () => {
  const isClient = typeof window === 'object'

  const getWidth = useCallback(
    () => (isClient ? window.innerWidth : undefined),
    [isClient]
  )

  const [windowWidth, setWindowWidth] = useState(getWidth())

  useEffect(() => {
    if (!isClient) return false

    const handleResize = () => {
      setWindowWidth(getWidth())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [getWidth, isClient])

  return windowWidth
}

export { useSiteMetadata, useMediaQuery, useWindowWidth }
