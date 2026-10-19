import { useId } from 'react'
import type { ComponentProps } from 'react'
import '../field.css'

// Accepts every native <textarea> attribute (disabled, readOnly, name, rows, value, onChange, …).
// `id` is generated so the label is always linked to the textarea.
type TextAreaProps = Omit<ComponentProps<'textarea'>, 'id'> & {
  label: string
}

function TextArea(props: TextAreaProps) {
  // label isn't a <textarea> attribute, so keep it out of the spread.
  const { label, ...textAreaProps } = props
  const id = useId()

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <textarea {...textAreaProps} id={id} />
    </div>
  )
}

export default TextArea
