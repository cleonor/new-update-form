import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Checkbox from './Checkbox.tsx'

describe('Checkbox', () => {
  it('renders a checkbox linked to its label', () => {
    render(<Checkbox label="Subscribe" />)

    expect(
      screen.getByRole('checkbox', { name: 'Subscribe' }),
    ).not.toBeChecked()
  })

  it('renders as a switch when isSwitch is set', () => {
    render(<Checkbox label="Notifications" isSwitch />)

    expect(
      screen.getByRole('switch', { name: 'Notifications' }),
    ).toBeInTheDocument()
  })

  it('toggles with the Enter key', () => {
    render(<Checkbox label="Subscribe" />)
    const checkbox = screen.getByRole('checkbox', { name: 'Subscribe' })

    fireEvent.keyDown(checkbox, { key: 'Enter' })

    expect(checkbox).toBeChecked()
  })
})
