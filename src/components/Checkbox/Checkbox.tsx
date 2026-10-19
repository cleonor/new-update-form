import { useCallback, useId } from 'react'
import type { ComponentProps, KeyboardEvent } from 'react'
import './Checkbox.css'

// Accepts every native checkbox attribute (disabled, name, checked, onChange, …).
// `isSwitch` announces it as an on/off switch to screen readers.
type CheckboxProps = Omit<ComponentProps<'input'>, 'id' | 'type' | 'role'> & {
  label: string
  isSwitch?: boolean
}

function Checkbox(props: CheckboxProps) {
  // label and isSwitch aren't <input> attributes, so keep them out of the spread.
  const { label, isSwitch, ...inputProps } = props
  const { onKeyDown } = inputProps
  const id = useId()

  // Checkboxes only toggle on Space natively; also toggle on Enter. Clicking the
  // input fires the usual onChange, and preventing the default stops Enter from
  // submitting the surrounding form.
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event)
      if (event.key !== 'Enter' || event.defaultPrevented) return
      event.preventDefault()
      if (!event.repeat) event.currentTarget.click()
    },
    [onKeyDown],
  )

  return (
    <div className="checkbox">
      <input
        {...inputProps}
        id={id}
        type="checkbox"
        role={isSwitch ? 'switch' : undefined}
        onKeyDown={handleKeyDown}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default Checkbox
