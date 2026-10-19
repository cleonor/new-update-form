import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { visuallyHidden } from '../../theme/styles.ts'

type FieldErrorProps = {
  id: string
  message: string
}

// A field's validation message, linked to the field through aria-describedby.
// The hidden "Error:" prefix tells screen reader users it's an error, not a hint.
// The space sits outside the hidden span: inside it, it gets dropped and screen
// readers would run the words together.
function FieldError(props: FieldErrorProps) {
  return (
    <p id={props.id} css={errorStyles}>
      <span css={visuallyHidden}>Error:</span> {props.message}
    </p>
  )
}

export default FieldError

// Error red on white is 7.5:1.
const errorStyles = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.intents.error.text};
`
