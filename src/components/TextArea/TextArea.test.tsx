import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import TextArea from './TextArea.tsx'

describe('TextArea', () => {
  it('renders a textarea linked to its label', () => {
    render(<TextArea label="Update" />)

    const textArea = screen.getByRole('textbox', { name: 'Update' })

    expect(textArea.tagName).toBe('TEXTAREA')
  })
})
