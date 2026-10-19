import type { ReactNode } from 'react'
import './Tag.css'

export type TagIntent = 'neutral' | 'info' | 'success' | 'warning' | 'error'

type TagProps = {
  children: ReactNode
  intent?: TagIntent
}

// Colour only reinforces the intent, so the text itself must say what it means
// (e.g. "Draft saved", not just a green pill).
function Tag(props: TagProps) {
  const intent = props.intent ?? 'neutral'

  return <span className={`tag tag--${intent}`}>{props.children}</span>
}

export default Tag
