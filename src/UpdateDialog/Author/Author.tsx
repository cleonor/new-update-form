import { useCallback, useId, useState } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import './Author.css'

function Author() {
  const [isEditable, setIsEditable] = useState(false)
  const inputId = useId()
  const toggleId = useId()

  const handleToggleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsEditable(event.target.checked)
    },
    [],
  )

  // Checkboxes only toggle on Space natively. Switches may also toggle on Enter,
  // and preventing the default stops Enter from submitting the form.
  const handleToggleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return
      event.preventDefault()
      if (!event.repeat) setIsEditable((current) => !current)
    },
    [],
  )

  return (
    <fieldset className="field">
      <legend>Author</legend>
      <div className="toggle">
        <input
          id={toggleId}
          type="checkbox"
          role="switch"
          checked={isEditable}
          onChange={handleToggleChange}
          onKeyDown={handleToggleKeyDown}
        />
        <label htmlFor={toggleId}>Edit author name</label>
      </div>
      <label htmlFor={inputId}>Author name</label>
      <input id={inputId} name="author" type="text" readOnly={!isEditable} />
    </fieldset>
  )
}

export default Author
