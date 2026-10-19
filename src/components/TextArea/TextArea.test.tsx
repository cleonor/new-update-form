import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import TextArea from './TextArea.tsx'

describe('TextArea', () => {
  it('renders a textarea linked to its label', () => {
    render(<TextArea label="Update" />)

    const textArea = screen.getByRole('textbox', { name: 'Update' })

    expect(textArea.tagName).toBe('TEXTAREA')
  })

  it('counts characters without a limit', () => {
    render(<TextArea label="Update" showCharacterCount />)
    const textArea = screen.getByRole('textbox', { name: 'Update' })

    fireEvent.change(textArea, { target: { value: 'Hi' } })

    expect(textArea).toHaveAccessibleDescription('2 characters')

    fireEvent.change(textArea, { target: { value: 'H' } })

    expect(textArea).toHaveAccessibleDescription('1 character')
  })
})
