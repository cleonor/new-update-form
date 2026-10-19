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
`

// Only the height can be changed, so a textarea never grows wider than its container.
export const textAreaStyles = css`
  resize: vertical;
`

// Character limit reached: the box-shadow thickens the border without shifting layout.
// The warning message below the field says the same thing, so colour isn't the only signal.
export const atLimitStyles = (theme: Theme) => css`
  border-color: ${theme.colors.intents.error.text};
  box-shadow: 0 0 0 1px ${theme.colors.intents.error.text};
`
