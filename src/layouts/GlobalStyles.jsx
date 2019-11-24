import React from 'react'
import { useTheme } from 'emotion-theming'
import { Global, css } from '@emotion/core'

import 'sanitize.css'
import 'sanitize.css/forms.css'

import '../fonts/geomanist/stylesheet.css'

const GlobalStyles = () => {
  const theme = useTheme()

  return (
    <Global
      styles={css`
        html {
          scroll-behavior: smooth;

          @media (prefers-reduced-motion: reduce) {
            scroll-behavior: auto;
          }
        }

        body {
          font-family: ${theme.fonts.georgia};
          color: ${theme.colors.black};
          line-height: ${theme.lineHeights.copy};
        }

        ::selection {
          background-color: ${theme.colors.greens[3]} !important;
          color: ${theme.colors.black} !important;
        }

        a {
          color: inherit;
          text-decoration: none;
          text-decoration-skip: ink;
          text-decoration-skip-ink: auto;
          transition: all 0.2s ease;
        }

        button,
        [role='button'],
        [type='button'],
        [type='submit'],
        [type='reset'] {
          cursor: pointer;
        }

        svg {
          max-width: 100%;
        }

        @media print {
          nav,
          footer {
            display: none !important;
          }

          #main-content {
            margin-bottom: 0 !important;
          }
        }
      `}
    />
  )
}

export default GlobalStyles
