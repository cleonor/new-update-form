import type { ReactNode } from 'react'

type IconProps = {
  children: ReactNode
}

// Shared 24×24 line-icon frame, sized to the surrounding text and drawn in its colour.
// Icons are decorative (the text next to them says what they mean), so they're
// hidden from screen readers.
function Icon(props: IconProps) {
  return (
    <svg
      width="1.25em"
      height="1.25em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {props.children}
    </svg>
  )
}

export default Icon
