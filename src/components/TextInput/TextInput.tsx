import { useId } from 'react'
import type { ComponentProps } from 'react'
import '../field.css'

// Accepts every native <input> attribute (disabled, readOnly, name, value, onChange, …).
// `id` is generated so the label is always linked to the input.
type TextInputProps = Omit<ComponentProps<'input'>, 'id' | 'type'> & {
  label: string
}

function TextInput(props: TextInputProps) {
  // label isn't an <input> attribute, so keep it out of the spread.
  const { label, ...inputProps } = props
  const id = useId()

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input {...inputProps} id={id} type="text" />
    </div>
  )
}

export default TextInput
