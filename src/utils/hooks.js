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

export { useSiteMetadata, useMediaQuery }
