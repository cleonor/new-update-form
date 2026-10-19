import { useId } from 'react'
import type { ComponentProps } from 'react'
import CharacterCount from '../CharacterCount/CharacterCount.tsx'
import { useCharacterCount } from '../CharacterCount/useCharacterCount.ts'
import '../field.css'

// Accepts every native <input> attribute (disabled, readOnly, name, value, maxLength, …).
// `id` is generated so the label is always linked to the input.
type TextInputProps = Omit<ComponentProps<'input'>, 'id' | 'type'> & {
  label: string
  showCharacterCount?: boolean
}

function TextInput(props: TextInputProps) {
  // label and showCharacterCount aren't <input> attributes, so keep them out of the spread.
  const { label, showCharacterCount, ...inputProps } = props
  const id = useId()
  const counterId = useId()
  const { length, handleChange } = useCharacterCount(
    inputProps.value,
    inputProps.defaultValue,
    inputProps.onChange,
  )

  const describedBy =
    [inputProps['aria-describedby'], showCharacterCount && counterId]
      .filter(Boolean)
      .join(' ') || undefined

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        {...inputProps}
        id={id}
        type="text"
        aria-describedby={describedBy}
        onChange={handleChange}
      />
      {showCharacterCount && (
        <CharacterCount
          id={counterId}
          length={length}
          maxLength={inputProps.maxLength}
        />
      )}
    </div>
  )
}

export default TextInput
