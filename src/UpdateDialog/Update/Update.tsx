import type { ChangeEvent } from 'react'
import TextArea from '../../components/TextArea/TextArea.tsx'

type UpdateProps = {
  value: string
  errorMessage?: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

function Update(props: UpdateProps) {
  const placeholderText: string = "Please write a few words about your update.";

  return (
    <TextArea
      label="Update"
      name="content"
      rows={6}
      placeholder={placeholderText}
      showCharacterCount
      value={props.value}
      errorMessage={props.errorMessage}
      onChange={props.onChange}
    />
  )
}

export default Update
