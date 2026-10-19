import { useId } from 'react'
import type { ComponentProps } from 'react'
import CharacterCount from '../CharacterCount/CharacterCount.tsx'
import { useCharacterCount } from '../CharacterCount/useCharacterCount.ts'
import {
  atLimitStyles,
  controlStyles,
  fieldStyles,
  textAreaStyles,
} from '../fieldStyles.ts'
import { joinIds } from '../joinIds.ts'

// Accepts every native <textarea> attribute (disabled, readOnly, name, rows, maxLength, …).
// `id` is generated so the label is always linked to the textarea.
// With maxLength, reaching the limit outlines the field in red and shows a warning.
type TextAreaProps = Omit<ComponentProps<'textarea'>, 'id'> & {
  label: string
  showCharacterCount?: boolean
}

function TextArea(props: TextAreaProps) {
  // label and showCharacterCount aren't <textarea> attributes, so keep them out of the spread.
  const { label, showCharacterCount, ...textAreaProps } = props
  const id = useId()
  const counterId = useId()
  const limitMessageId = useId()
  const { length, isAtLimit, handleChange } = useCharacterCount(
    textAreaProps.value,
    textAreaProps.defaultValue,
    textAreaProps.maxLength,
    textAreaProps.onChange,
  )

  return (
    <div css={fieldStyles}>
      <label htmlFor={id}>{label}</label>
      <textarea
        {...textAreaProps}
        id={id}
        css={[controlStyles, textAreaStyles, isAtLimit && atLimitStyles]}
        aria-describedby={joinIds(
          textAreaProps['aria-describedby'],
          isAtLimit && limitMessageId,
          showCharacterCount && counterId,
        )}
        onChange={handleChange}
      />
      <CharacterCount
        counterId={counterId}
        limitMessageId={limitMessageId}
        length={length}
        maxLength={textAreaProps.maxLength}
        showCount={showCharacterCount ?? false}
      />
    </div>
  )
}

export default TextArea
