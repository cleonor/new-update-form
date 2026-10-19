import { useCallback, useState } from 'react'
import type { ChangeEvent, ComponentProps } from 'react'

type FieldValue = ComponentProps<'input'>['value']

// Counts characters for both controlled (`value`) and uncontrolled (`defaultValue`)
// fields. Wrap the field's onChange with the returned handleChange.
export function useCharacterCount<
  T extends HTMLInputElement | HTMLTextAreaElement,
>(
  value: FieldValue,
  defaultValue: FieldValue,
  maxLength: number | undefined,
  onChange: ((event: ChangeEvent<T>) => void) | undefined,
) {
  const [uncontrolledLength, setUncontrolledLength] = useState(
    String(defaultValue ?? '').length,
  )

  const handleChange = useCallback(
    (event: ChangeEvent<T>) => {
      setUncontrolledLength(event.target.value.length)
      onChange?.(event)
    },
    [onChange],
  )

  const length = value === undefined ? uncontrolledLength : String(value).length
  const isAtLimit = maxLength !== undefined && length >= maxLength

  return { length, isAtLimit, handleChange }
}
