import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { visuallyHidden } from '../../theme/styles.ts'

type CharacterCountProps = {
  counterId: string
  limitMessageId: string
  length: number
  maxLength?: number
  showCount: boolean
}

// Renders below a field: the limit warning on the left, the counter on the right.
//
// The counter shows "12/100 characters"; screen readers get "12 of 100 characters"
// through the field's aria-describedby, so it's read on focus rather than on every
// keystroke.
//
// The limit warning sits in an aria-live region that's always rendered when there's
// a maxLength, so screen readers announce the message the moment it appears.
function CharacterCount(props: CharacterCountProps) {
  const hasLimit = props.maxLength !== undefined
  const isAtLimit = hasLimit && props.length >= (props.maxLength ?? 0)

  if (!hasLimit && !props.showCount) return null

  const unit = hasLimit || props.length !== 1 ? 'characters' : 'character'
  const visibleText = hasLimit
    ? `${props.length}/${props.maxLength} ${unit}`
    : `${props.length} ${unit}`
  const spokenText = hasLimit
    ? `${props.length} of ${props.maxLength} ${unit}`
    : `${props.length} ${unit}`

  return (
    <div css={containerStyles}>
      {hasLimit && (
        <p id={props.limitMessageId} css={limitStyles} aria-live="polite">
          {isAtLimit &&
            `You've reached the maximum of ${props.maxLength} characters.`}
        </p>
      )}
      {props.showCount && (
        <p id={props.counterId} css={countStyles}>
          <span aria-hidden="true">{visibleText}</span>
          <span css={visuallyHidden}>{spokenText}</span>
        </p>
      )}
    </div>
  )
}

export default CharacterCount

const containerStyles = (theme: Theme) => css`
  display: flex;
  justify-content: space-between;
  gap: ${theme.space.md};
  font-size: ${theme.fontSizes.small};
`

const limitStyles = (theme: Theme) => css`
  margin: 0;
  color: ${theme.colors.intents.error.text};
`

// Pushed right even when there's no limit message.
const countStyles = (theme: Theme) => css`
  margin: 0 0 0 auto;
  color: ${theme.colors.mutedText};
  white-space: nowrap;
`
