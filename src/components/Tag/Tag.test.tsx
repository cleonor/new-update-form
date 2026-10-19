import { describe, expect, it } from 'vitest'
import { render, screen } from '../../test/render.tsx'
import { theme } from '../../theme/theme.ts'
import CheckIcon from '../icons/CheckIcon.tsx'
import Tag from './Tag.tsx'

describe('Tag', () => {
  it('renders its text with the neutral intent by default', () => {
    render(<Tag>Draft</Tag>)

    expect(screen.getByText('Draft')).toHaveStyle({
      color: theme.colors.intents.neutral.text,
      backgroundColor: theme.colors.intents.neutral.background,
    })
  })

  it('shows an icon before the text, hidden from screen readers', () => {
    render(<Tag icon={<CheckIcon />}>Saved</Tag>)
    const tag = screen.getByText('Saved')

    expect(tag.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
    expect(tag.textContent).toBe('Saved')
  })

  it('applies the given intent', () => {
    render(<Tag intent="success">Saved</Tag>)

    expect(screen.getByText('Saved')).toHaveStyle({
      color: theme.colors.intents.success.text,
      backgroundColor: theme.colors.intents.success.background,
    })
  })
})
