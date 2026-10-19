import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { loadDraft } from '../storage/draftStorage.ts'
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

  it('saves the draft to Local Storage and shows a success message', () => {
    render(<UpdateDialog />)

    fireEvent.change(screen.getByLabelText('Title'), {
      target: { value: 'Release notes' },
    })
    fireEvent.change(screen.getByLabelText('Update'), {
      target: { value: 'Version 2 is out.' },
    })
    fireEvent.click(screen.getByRole('switch', { name: 'Edit author name' }))
    fireEvent.change(screen.getByLabelText('Author name'), {
      target: { value: 'Sam' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Save draft' }))

    expect(loadDraft()).toMatchObject({
      title: 'Release notes',
      content: 'Version 2 is out.',
      author: 'Sam',
      isAuthorEditable: true,
    })
    expect(screen.getByRole('status')).toHaveTextContent(/^Draft saved at/)
  })

  it('keeps showing but stops saving the author name when editing is turned off', () => {
    render(<UpdateDialog />)
    const toggle = screen.getByRole('switch', { name: 'Edit author name' })
    const author = screen.getByLabelText('Author name')
    const saveButton = screen.getByRole('button', { name: 'Save draft' })

    fireEvent.click(toggle)
    fireEvent.change(author, { target: { value: 'Sam' } })
    fireEvent.click(saveButton)

    expect(loadDraft()).toMatchObject({ author: 'Sam', isAuthorEditable: true })

    fireEvent.click(toggle)
    fireEvent.click(saveButton)

    expect(author).toHaveValue('Sam')
    expect(author).toHaveAttribute('readonly')
    expect(loadDraft()).toMatchObject({ author: '', isAuthorEditable: false })

    fireEvent.click(toggle)

    expect(author).toHaveValue('Sam')
  })

  it('shows an error message when the draft cannot be saved', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })
    render(<UpdateDialog />)

    fireEvent.click(screen.getByRole('button', { name: 'Save draft' }))

    expect(screen.getByRole('status')).toHaveTextContent(
      "Draft couldn't be saved.",
    )
  })
})
