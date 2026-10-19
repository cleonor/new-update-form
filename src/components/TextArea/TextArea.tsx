import { useId } from 'react'
import type { ComponentProps } from 'react'
import CharacterCount from '../CharacterCount/CharacterCount.tsx'
import { useCharacterCount } from '../CharacterCount/useCharacterCount.ts'
import { joinIds } from '../joinIds.ts'
import '../field.css'

// Accepts every native <textarea> attribute (disabled, readOnly, name, rows, maxLength, …).
// `id` is generated so the label is always linked to the textarea.
type TextAreaProps = Omit<ComponentProps<'textarea'>, 'id'> & {
  label: string
  showCharacterCount?: boolean
}

function TextArea(props: TextAreaProps) {
  // label and showCharacterCount aren't <textarea> attributes, so keep them out of the spread.
  const { label, showCharacterCount, ...textAreaProps } = props
  const id = useId()
  const counterId = useId()
  const { length, handleChange } = useCharacterCount(
    textAreaProps.value,
    textAreaProps.defaultValue,
    textAreaProps.onChange,
  )

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <textarea
        {...textAreaProps}
        id={id}
        aria-describedby={joinIds(
          textAreaProps['aria-describedby'],
          showCharacterCount && counterId,
        )}
        onChange={handleChange}
      />
      {showCharacterCount && (
        <CharacterCount
          id={counterId}
          length={length}
          maxLength={textAreaProps.maxLength}
        />
      )}
    </div>
  )
}

export default TextArea
