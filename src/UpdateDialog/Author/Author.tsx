import { useId } from 'react'
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
  const titleId = useId()
  const placeholderText: string = "You can choose to publish this update under a different name.";

  return (
    // Named with aria-labelledby instead of <legend>: browsers (Safari especially)
    // don't reliably lay out a legend side by side with other content.
    <fieldset className="author" aria-labelledby={titleId}>
      <div className="author__header">
        <span id={titleId}>Author</span>
        <Checkbox
          label="Change author"
          isSwitch
          infoText={placeholderText}
          checked={props.isEditable}
          onChange={props.onEditableChange}
        />
      </div>
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
