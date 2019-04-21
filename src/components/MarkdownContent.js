import styled from 'styled-components'
import { Text } from 'rebass'
import { themeHover } from '../utils/styles.js'

const MarkdownContent = styled(Text)`
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  /* Vertical Rhythm */
  & > * {
    /* reset all margins */
    margin-top: 0;
    margin-bottom: 0;

    /* margin top to all child elements */
    & + * {
      margin-top: ${({ theme }) => theme.space[3]};
    }

    /* bigger margin top on headers */
    & + h1,
    & + h2 {
      margin-top: ${({ theme }) => theme.space[5]};
    }

    & + h3,
    & + h4 {
      margin-top: ${({ theme }) => theme.space[4]};
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: ${({ theme }) => theme.lineHeights.title};
  }

  p,
  ul,
  ol,
  dl,
  address {
    max-width: 33em;
    margin-right: ${({ center }) => (center ? 'auto' : 0)};
    margin-left: ${({ center }) => (center ? 'auto' : 0)};
  }

  /* Headers */
  h1 {
    font-size: ${({ theme }) => theme.fontSizes[3]};
    font-weight: 700;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      font-size: ${({ theme }) => theme.fontSizes[4]};
    }
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    font-weight: 500;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      font-size: ${({ theme }) => theme.fontSizes[3]};
    }
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSizes[1]};
    font-weight: 500;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      font-size: ${({ theme }) => theme.fontSizes[2]};
    }
  }

  h4,
  h5,
  h6 {
    font-size: ${({ theme }) => theme.fontSizes[0]};
    font-weight: 500;
    text-transform: uppercase;

    @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
      font-size: ${({ theme }) => theme.fontSizes[1]};
    }
  }

  /* Type Elements */

  hr {
    height: ${({ theme }) => theme.space[3]};
    max-width: 40rem;
    margin-right: ${({ center }) => (center ? 'auto' : 0)};
    margin-left: ${({ center }) => (center ? 'auto' : 0)};
    border: 0;
    background-color: ${({ theme }) => theme.colors.green};
  }

  ul,
  ol,
  dl {
    padding-left: ${({ theme }) => theme.space[4]};
  }

  ul ul,
  ol ol,
  ul ol,
  ol ul {
    margin-top: 0;
    margin-bottom: 0;
  }

  b,
  strong,
  em,
  small,
  code {
    line-height: 1;
  }

  sup,
  sub {
    vertical-align: baseline;
    position: relative;
    top: -0.4em;
  }

  sub {
    top: 0.4em;
  }

  a {
    ${themeHover};
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.colors.green};

    @media print {
      &:after {
        content: ' (' attr(href) ')';
        font-size: 0.875em;
      }
      &[href^='/']:after {
        content: ' (https://azgolfgurus.com' attr(href) ')';
      }
      &[href^='#'] {
        text-decoration: none;

        &:after {
          content: '';
        }
      }
    }
  }

  blockquote,
  details {
    margin-top: ${({ theme }) => theme.space[4]};
    margin-right: 0;
    margin-bottom: ${({ theme }) => theme.space[4]};
    margin-left: 0;
    border-left: ${({ theme }) => theme.borders[4]}
      ${({ theme }) => theme.colors.green};
    border-radius: ${({ theme }) => theme.radii[1]};
    padding: ${({ theme }) => theme.space[3]};
    background-color: ${({ theme }) => theme.colors.nearWhite};

    p {
      max-width: 30em;
    }

    > :first-child {
      margin-top: 0;
    }
    > :last-child {
      margin-bottom: 0;
    }
  }

  img {
    display: block;
    width: 100%;
    max-width: 48rem;
    margin-top: ${({ theme }) => theme.space[4]};
    margin-right: ${({ center }) => (center ? 'auto' : 0)};
    margin-bottom: ${({ theme }) => theme.space[4]};
    margin-left: ${({ center }) => (center ? 'auto' : 0)};
    border-radius: ${({ theme }) => theme.radii[1]};
  }
`

export default MarkdownContent
