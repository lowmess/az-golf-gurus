import React from 'react'

const Hamburger = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    stroke="currentcolor"
    strokeWidth="3"
    style={{ verticalAlign: 'middle' }}
  >
    <title>Open the menu</title>
    <path d="M0 2.5h16M0 8h16M0 13.5h16" />
  </svg>
)

const Close = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="none"
    stroke="currentcolor"
    strokeWidth="3"
    style={{ verticalAlign: 'middle' }}
  >
    <title>Close the menu</title>
    <path d="M1.06 1.06l13.88 13.88M14.94 1.06L1.06 14.94" />
  </svg>
)

export { Hamburger, Close }
