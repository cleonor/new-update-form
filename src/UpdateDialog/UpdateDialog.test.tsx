import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import UpdateDialog from './UpdateDialog.tsx'

describe('UpdateDialog', () => {
  it('opens with the title, update and author fields', () => {
    render(<UpdateDialog />)

    expect(screen.getByRole('dialog', { name: 'New update' })).toBeVisible()
    expect(screen.getByLabelText('Title')).toBeInTheDocument()
    expect(screen.getByLabelText('Update')).toBeInTheDocument()
    expect(screen.getByLabelText('Author name')).toBeInTheDocument()
  })

  it('makes the author name editable only when the toggle is on', () => {
    render(<UpdateDialog />)
    const author = screen.getByLabelText('Author name')

    expect(author).toHaveAttribute('readonly')

    fireEvent.click(screen.getByRole('switch', { name: 'Edit author name' }))

    expect(author).not.toHaveAttribute('readonly')
  })

  it('toggles author editing with the Enter key', () => {
    render(<UpdateDialog />)
    const author = screen.getByLabelText('Author name')
    const toggle = screen.getByRole('switch', { name: 'Edit author name' })

    fireEvent.keyDown(toggle, { key: 'Enter' })

    expect(toggle).toBeChecked()
    expect(author).not.toHaveAttribute('readonly')

    fireEvent.keyDown(toggle, { key: 'Enter' })

    expect(toggle).not.toBeChecked()
    expect(author).toHaveAttribute('readonly')
  })
})
