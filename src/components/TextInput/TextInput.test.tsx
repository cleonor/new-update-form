import { fireEvent, render, screen } from '@testing-library/react'
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

  it('has no character count unless asked for', () => {
    render(<TextInput label="Title" />)

    expect(
      screen.getByRole('textbox', { name: 'Title' }),
    ).not.toHaveAccessibleDescription()
  })

  it('counts characters against the max length', () => {
    render(<TextInput label="Title" maxLength={100} showCharacterCount />)
    const input = screen.getByRole('textbox', { name: 'Title' })

    expect(input).toHaveAttribute('maxlength', '100')
    expect(screen.getByText('0/100 characters')).toBeInTheDocument()

    fireEvent.change(input, { target: { value: 'Hello' } })

    expect(screen.getByText('5/100 characters')).toBeInTheDocument()
    expect(input).toHaveAccessibleDescription('5 of 100 characters')
  })

  it('warns when the max length is reached', () => {
    render(<TextInput label="Title" maxLength={10} showCharacterCount />)
    const input = screen.getByRole('textbox', { name: 'Title' })
    const message = "You've reached the maximum of 10 characters."

    fireEvent.change(input, { target: { value: '123456789' } })

    expect(screen.queryByText(message)).not.toBeInTheDocument()

    fireEvent.change(input, { target: { value: '1234567890' } })

    expect(screen.getByText(message)).toHaveAttribute('aria-live', 'polite')
    expect(input).toHaveAccessibleDescription(
      `${message} 10 of 10 characters`,
    )
    expect(input).not.toHaveAttribute('aria-invalid')
  })
})
