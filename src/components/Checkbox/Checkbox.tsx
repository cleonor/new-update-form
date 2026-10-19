import { useCallback, useId } from 'react'
import type { ComponentProps, KeyboardEvent } from 'react'
import { joinIds } from '../joinIds.ts'
import './Checkbox.css'

// Accepts every native checkbox attribute (disabled, name, checked, onChange, …).
// `isSwitch` announces it as an on/off switch to screen readers.
// `infoText` is shown below and read as the checkbox's description.
type CheckboxProps = Omit<ComponentProps<'input'>, 'id' | 'type' | 'role'> & {
  label: string
  isSwitch?: boolean
  infoText?: string
}

function Checkbox(props: CheckboxProps) {
  // label, isSwitch and infoText aren't <input> attributes, so keep them out of the spread.
  const { label, isSwitch, infoText, ...inputProps } = props
  const { onKeyDown } = inputProps
  const id = useId()
  const infoId = useId()

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
      <div className="checkbox__control">
        <input
          {...inputProps}
          id={id}
          type="checkbox"
          role={isSwitch ? 'switch' : undefined}
          aria-describedby={joinIds(
            inputProps['aria-describedby'],
            infoText && infoId,
          )}
          onKeyDown={handleKeyDown}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      {infoText && (
        <p id={infoId} className="checkbox__info">
          {infoText}
        </p>
      )}
    </div>
  )
}

export default Checkbox
