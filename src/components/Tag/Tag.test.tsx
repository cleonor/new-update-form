import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Tag from './Tag.tsx'

describe('Tag', () => {
  it('renders its text with the neutral intent by default', () => {
    render(<Tag>Draft</Tag>)

    expect(screen.getByText('Draft')).toHaveClass('tag', 'tag--neutral')
  })

  it('applies the given intent', () => {
    render(<Tag intent="success">Saved</Tag>)

    expect(screen.getByText('Saved')).toHaveClass('tag--success')
  })
})
