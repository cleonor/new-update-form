import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'

// Shared by TextInput and TextArea.
export const fieldStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.xs};
`

export const controlStyles = (theme: Theme) => css`
  font: inherit;
  padding: ${theme.space.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.default};

  /* Placeholders are hints only; the label always names the field.
     Firefox lowers placeholder opacity by default, so reset it. */
  &::placeholder {
    color: ${theme.colors.mutedText};
    opacity: 1;
  }

  &:read-only {
    background: ${theme.colors.readOnlyBackground};
  }

  &:disabled {
    cursor: not-allowed;
  }

  /* A 1px outline on top of a border in the same colour reads as a 2px ring,
     so focus stays clearly visible. Blue on white is 6:1. */
  &:focus-visible {
    border-color: ${theme.colors.focus};
    outline: 1px solid ${theme.colors.focus};
    outline-offset: 0;
  }
`

// Only the height can be changed, so a textarea never grows wider than its container.
export const textAreaStyles = css`
  resize: vertical;
`

// Character limit reached: red border, and a red focus ring instead of blue.
// The warning message below the field says the same thing, so colour isn't the only signal.
export const atLimitStyles = (theme: Theme) => css`
  border-color: ${theme.colors.intents.error.text};

  &:focus-visible {
    border-color: ${theme.colors.intents.error.text};
    outline-color: ${theme.colors.intents.error.text};
  }
`
