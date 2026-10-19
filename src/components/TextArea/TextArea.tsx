import { useId } from 'react'
import type { ComponentProps } from 'react'
import CharacterCount from '../CharacterCount/CharacterCount.tsx'
import { useCharacterCount } from '../CharacterCount/useCharacterCount.ts'
import FieldError from '../FieldError/FieldError.tsx'
import {
  controlStyles,
  fieldStyles,
  inactiveLabelStyles,
  invalidStyles,
  labelStyles,
  textAreaStyles,
} from '../fieldStyles.ts'
import { joinIds } from '../joinIds.ts'

type TextAreaProps = Omit<ComponentProps<'textarea'>, 'id'> & {
  label: string
  /**
   * Shows a character counter below the field: "12/100 characters" with
   * `maxLength`, or "12 characters" without. Screen readers hear
   * "12 of 100 characters" when the field is focused.
   * @default false
   */
  showCharacterCount?: boolean
  /**
   * Validation message shown below the field, e.g. "Write your update". When set,
   * the field is outlined in red and marked invalid for screen readers.
   */
  errorMessage?: string
}

function TextArea(props: TextAreaProps) {
  // label, showCharacterCount and errorMessage aren't <textarea> attributes, so keep them out of the spread.
  const { label, showCharacterCount, errorMessage, ...textAreaProps } = props
  const id = useId()
  const errorId = useId()
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
      <label
        htmlFor={id}
        css={[
          labelStyles,
          (textAreaProps.readOnly || textAreaProps.disabled) && inactiveLabelStyles,
        ]}
      >
        {label}
      </label>
      <textarea
        {...textAreaProps}
        id={id}
        css={[
          controlStyles,
          textAreaStyles,
          (errorMessage || isAtLimit) && invalidStyles,
        ]}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={joinIds(
          textAreaProps['aria-describedby'],
          errorMessage && errorId,
          isAtLimit && limitMessageId,
          showCharacterCount && counterId,
        )}
        onChange={handleChange}
      />
      {errorMessage && <FieldError id={errorId} message={errorMessage} />}
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
