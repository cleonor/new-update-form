import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import TextInput from './TextInput.tsx'

describe('TextInput', () => {
  it('renders a text input linked to its label', () => {
    render(<TextInput label="Title" />)

    expect(screen.getByRole('textbox', { name: 'Title' })).toBeEnabled()
  })

  it('can be disabled', () => {
    render(<TextInput label="Title" disabled />)

    expect(screen.getByRole('textbox', { name: 'Title' })).toBeDisabled()
  })
})
