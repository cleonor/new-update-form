import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { useId } from 'react'
import type { ChangeEvent } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox.tsx'
import TextInput from '../../components/TextInput/TextInput.tsx'

type AuthorProps = {
  value: string
  isEditable: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onEditableChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function Author(props: AuthorProps) {
  const titleId = useId()
  const placeholderText: string = "You can choose to publish this update under a different name.";

  return (
    // Named with aria-labelledby instead of <legend>: browsers (Safari especially)
    // don't reliably lay out a legend side by side with other content.
    <fieldset css={fieldsetStyles} aria-labelledby={titleId}>
      <div css={headerStyles}>
        <span id={titleId}>Author</span>
        <Checkbox
          label="Change author"
          isSwitch
          align="end"
          infoText={placeholderText}
          checked={props.isEditable}
          onChange={props.onEditableChange}
        />
      </div>
      <TextInput
        label="Author name"
        name="author"
        readOnly={!props.isEditable}
        value={props.value}
        onChange={props.onChange}
      />
    </fieldset>
  )
}

export default Author

const fieldsetStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.sm};
  margin: 0;
  padding: 0;
  border: 0;
`

// Title on the left, switch on the right. Baseline alignment lines up
// "Author" with the switch's label text, whatever the switch's height.
const headerStyles = (theme: Theme) => css`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${theme.space.md};
`
