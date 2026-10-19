import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '../../test/render.tsx'
import { theme } from '../../theme/theme.ts'
import Button from './Button.tsx'

describe('Button', () => {
  it('is a plain button by default, so it never submits a form by accident', () => {
    render(<Button>Cancel</Button>)

    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveAttribute(
      'type',
      'button',
    )
  })

  it('can be a submit button', () => {
    render(<Button type="submit">Save draft</Button>)

    expect(screen.getByRole('button', { name: 'Save draft' })).toHaveAttribute(
      'type',
      'submit',
    )
  })

  it('calls onClick', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Cancel</Button>)

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('applies the primary variant colours', () => {
    render(<Button variant="primary">Publish update</Button>)

    expect(screen.getByRole('button', { name: 'Publish update' })).toHaveStyle({
      backgroundColor: theme.colors.accent,
      color: theme.colors.surface,
    })
  })
})
