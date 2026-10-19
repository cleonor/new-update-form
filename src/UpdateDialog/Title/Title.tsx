import type { ChangeEvent } from 'react'
import TextInput from '../../components/TextInput/TextInput.tsx'

type TitleProps = {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function Title(props: TitleProps) {
  return (
    <TextInput
      label="Title"
      name="title"
      maxLength={100}
      showCharacterCount
      value={props.value}
      onChange={props.onChange}
    />
  )
}

export default Title
