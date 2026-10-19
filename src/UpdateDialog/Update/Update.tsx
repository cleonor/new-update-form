import type { ChangeEvent } from 'react'
import TextArea from '../../components/TextArea/TextArea.tsx'

type UpdateProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

function Update(props: UpdateProps) {
  return (
    <TextArea
      label="Update"
      name="content"
      rows={6}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

export default Update
