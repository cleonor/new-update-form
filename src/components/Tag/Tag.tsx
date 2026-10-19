import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import type { ReactNode } from 'react'
import type { Intent } from '../../theme/theme.ts'

export type TagIntent = Intent

type TagProps = {
  children: ReactNode
  intent?: TagIntent
  icon?: ReactNode
}

// Colour and icon only reinforce the intent, so the text itself must say what
// it means (e.g. "Draft saved", not just a coloured pill with a tick).
function Tag(props: TagProps) {
  const intent = props.intent ?? 'neutral'

  return (
    <span css={[baseStyles, intentStyles(intent)]} data-intent={intent}>
      {props.icon}
      {props.children}
    </span>
  )
}

export default Tag

const baseStyles = (theme: Theme) => css`
  display: inline-flex;
  align-items: center;
  gap: ${theme.space.sm};
  padding: ${theme.space.xs} ${theme.space.md};
  /* Transparent normally, but shown in Windows high contrast mode. */
  border: 1px solid transparent;
  border-radius: ${theme.radii.pill};
  font-family: ${theme.fonts.medium};
  font-size: ${theme.fontSizes.small};
`

// Colours come from the theme's intents (all WCAG AA).
const intentStyles = (intent: TagIntent) => (theme: Theme) => css`
  background: ${theme.colors.intents[intent].background};
  color: ${theme.colors.intents[intent].text};
`
