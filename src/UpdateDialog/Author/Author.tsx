import type { ChangeEvent } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox.tsx'
import TextInput from '../../components/TextInput/TextInput.tsx'
import './Author.css'

type AuthorProps = {
  value: string
  isEditable: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onEditableChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function Author(props: AuthorProps) {
  return (
    <fieldset className="author">
      <legend>Author</legend>
      <Checkbox
        label="Edit author name"
        isSwitch
        checked={props.isEditable}
        onChange={props.onEditableChange}
      />
      <TextInput
        label="Author name"
        name="author"
        readOnly={!props.isEditable}
        value={props.value}
        onChange={props.onChange}
      />
    </fieldset>
  )
}

export default Author
