import './CharacterCount.css'

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
    <div className="character-count">
      {hasLimit && (
        <p
          id={props.limitMessageId}
          className="character-count__limit"
          aria-live="polite"
        >
          {isAtLimit &&
            `You've reached the maximum of ${props.maxLength} characters.`}
        </p>
      )}
      {props.showCount && (
        <p id={props.counterId} className="character-count__count">
          <span aria-hidden="true">{visibleText}</span>
          <span className="visually-hidden">{spokenText}</span>
        </p>
      )}
    </div>
  )
}

export default CharacterCount
