import { fireEvent, render, screen } from '../../test/render.tsx'
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

  it('shows info text and uses it as the description', () => {
    render(<Checkbox label="Subscribe" infoText="Weekly, no spam." />)

    expect(screen.getByText('Weekly, no spam.')).toBeInTheDocument()
    expect(
      screen.getByRole('checkbox', { name: 'Subscribe' }),
    ).toHaveAccessibleDescription('Weekly, no spam.')
  })

  it('has no description without info text', () => {
    render(<Checkbox label="Subscribe" />)

    expect(
      screen.getByRole('checkbox', { name: 'Subscribe' }),
    ).not.toHaveAccessibleDescription()
  })

  it('toggles with the Enter key', () => {
    render(<Checkbox label="Subscribe" />)
    const checkbox = screen.getByRole('checkbox', { name: 'Subscribe' })

    fireEvent.keyDown(checkbox, { key: 'Enter' })

    expect(checkbox).toBeChecked()
  })
})
