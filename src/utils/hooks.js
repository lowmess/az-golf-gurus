import { useState, useEffect, useCallback } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

// Returns `siteMetadata` object as defined in `gatsby-config.js`
export function useSiteMetadata() {
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

// Returns bool (result of `MediaQueryList.matches`)
export function useMediaQuery(query) {
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

// Returns object `{width, height}`
export function useWindowSize() {
  const isClient = typeof window === 'object'

  const getSize = useCallback(
    () => ({
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    }),
    [isClient]
  )

  const [windowSize, setWindowSize] = useState(getSize())

  useEffect(() => {
    if (!isClient) return false

    const handleResize = () => {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [getSize, isClient])

  return windowSize
}

// @link https://usehooks.com/useScript/
const cachedScripts = []
export function useScript(src) {
  // Keeping track of script loaded and error state
  const [state, setState] = useState({
    loaded: false,
    error: false,
  })

  useEffect(
    () => {
      // If cachedScripts array already includes src that means another instance ...
      // ... of this hook already loaded this script, so no need to load again.
      if (cachedScripts.includes(src)) {
        setState({
          loaded: true,
          error: false,
        })
      } else {
        cachedScripts.push(src)

        // Create script
        const script = document.createElement('script')
        script.src = src
        script.async = true

        // Script event listener callbacks for load and error
        const onScriptLoad = () => {
          setState({
            loaded: true,
            error: false,
          })
        }

        const onScriptError = () => {
          // Remove from cachedScripts we can try loading again
          const index = cachedScripts.indexOf(src)
          if (index >= 0) cachedScripts.splice(index, 1)
          script.remove()

          setState({
            loaded: true,
            error: true,
          })
        }

        script.addEventListener('load', onScriptLoad)
        script.addEventListener('error', onScriptError)

        // Add script to document body
        document.body.appendChild(script)

        // Remove event listeners on cleanup
        return () => {
          script.removeEventListener('load', onScriptLoad)
          script.removeEventListener('error', onScriptError)
        }
      }
    },
    [src] // Only re-run effect if script src changes
  )

  return [state.loaded, state.error]
}
