import { useCallback, useState } from 'react'
import type { ChangeEvent } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox.tsx'
import TextInput from '../../components/TextInput/TextInput.tsx'
import './Author.css'

function Author() {
  const [isEditable, setIsEditable] = useState(false)

  const handleToggleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsEditable(event.target.checked)
    },
    [],
  )

  return (
    <fieldset className="author">
      <legend>Author</legend>
      <Checkbox
        label="Edit author name"
        isSwitch
        checked={isEditable}
        onChange={handleToggleChange}
      />
      <TextInput label="Author name" name="author" readOnly={!isEditable} />
    </fieldset>
  )
}

export default Author
