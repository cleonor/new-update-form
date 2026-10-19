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
} from '../fieldStyles.ts'
import { joinIds } from '../joinIds.ts'

type TextInputProps = Omit<ComponentProps<'input'>, 'id' | 'type'> & {
  label: string
  /**
   * Shows a character counter below the field: "12/100 characters" with
   * `maxLength`, or "12 characters" without. Screen readers hear
   * "12 of 100 characters" when the field is focused.
   * @default false
   */
  showCharacterCount?: boolean
  /**
   * Validation message shown below the field, e.g. "Enter a title". When set,
   * the field is outlined in red and marked invalid for screen readers.
   */
  errorMessage?: string
}

function TextInput(props: TextInputProps) {
  // label, showCharacterCount and errorMessage aren't <input> attributes, so keep them out of the spread.
  const { label, showCharacterCount, errorMessage, ...inputProps } = props
  const id = useId()
  const errorId = useId()
  const counterId = useId()
  const limitMessageId = useId()
  const { length, isAtLimit, handleChange } = useCharacterCount(
    inputProps.value,
    inputProps.defaultValue,
    inputProps.maxLength,
    inputProps.onChange,
  )

  return (
    <div css={fieldStyles}>
      <label
        htmlFor={id}
        css={[
          labelStyles,
          (inputProps.readOnly || inputProps.disabled) && inactiveLabelStyles,
        ]}
      >
        {label}
      </label>
      <input
        {...inputProps}
        id={id}
        type="text"
        css={[controlStyles, (errorMessage || isAtLimit) && invalidStyles]}
        aria-invalid={errorMessage ? true : undefined}
        aria-describedby={joinIds(
          inputProps['aria-describedby'],
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
        maxLength={inputProps.maxLength}
        showCount={showCharacterCount ?? false}
      />
    </div>
  )
}

export default TextInput
