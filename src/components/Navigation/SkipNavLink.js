import React from 'react'
import styled from 'styled-components'
import { themeHover } from '../../utils/styles'

const Link = styled('a')`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space[3]};
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.geomanist};
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;

  &:focus {
    pointer-events: auto;
    opacity: 1;
  }

  ${themeHover};
`

const SkipNavLink = () => <Link href="#main-content">Skip to main content</Link>

export default SkipNavLink
