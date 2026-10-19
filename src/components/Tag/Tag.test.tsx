import { describe, expect, it } from 'vitest'
import { render, screen } from '../../test/render.tsx'
import { theme } from '../../theme/theme.ts'
import Tag from './Tag.tsx'

describe('Tag', () => {
  it('renders its text with the neutral intent by default', () => {
    render(<Tag>Draft</Tag>)

    expect(screen.getByText('Draft')).toHaveStyle({
      color: theme.colors.intents.neutral.text,
      backgroundColor: theme.colors.intents.neutral.background,
    })
  })

  it('applies the given intent', () => {
    render(<Tag intent="success">Saved</Tag>)

    expect(screen.getByText('Saved')).toHaveStyle({
      color: theme.colors.intents.success.text,
      backgroundColor: theme.colors.intents.success.background,
    })
  })
})
