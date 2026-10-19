import { useId } from 'react'
import type { ComponentProps } from 'react'
import CharacterCount from '../CharacterCount/CharacterCount.tsx'
import { useCharacterCount } from '../CharacterCount/useCharacterCount.ts'
import {
  atLimitStyles,
  controlStyles,
  fieldStyles,
  inactiveLabelStyles,
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
