import './CharacterCount.css'

type CharacterCountProps = {
  id: string
  length: number
  maxLength?: number
}

// Shows "12/100 characters" (or "12 characters" without a limit). Screen readers get
// "12 of 100 characters" instead of "slash", through the field's aria-describedby,
// so it's read when the field is focused rather than announced on every keystroke.
function CharacterCount(props: CharacterCountProps) {
  const hasLimit = props.maxLength !== undefined
  const unit = hasLimit || props.length !== 1 ? 'characters' : 'character'
  const visibleText = hasLimit
    ? `${props.length}/${props.maxLength} ${unit}`
    : `${props.length} ${unit}`
  const spokenText = hasLimit
    ? `${props.length} of ${props.maxLength} ${unit}`
    : `${props.length} ${unit}`

  return (
    <p id={props.id} className="character-count">
      <span aria-hidden="true">{visibleText}</span>
      <span className="visually-hidden">{spokenText}</span>
    </p>
  )
}

export default CharacterCount
