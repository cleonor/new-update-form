import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { useId } from 'react'
import type { ChangeEvent } from 'react'
import Checkbox from '../../components/Checkbox/Checkbox.tsx'
import TextInput from '../../components/TextInput/TextInput.tsx'
import { labelStyles } from '../../components/fieldStyles.ts'

type AuthorProps = {
  value: string
  isEditable: boolean
  errorMessage?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onEditableChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function Author(props: AuthorProps) {
  const titleId = useId()
  const placeholderText: string = "You can choose to publish this update under a different name.";

  return (
    <fieldset css={fieldsetStyles} aria-labelledby={titleId}>
      <div css={headerStyles}>
        <span id={titleId} css={labelStyles}>
          Author
        </span>
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
        errorMessage={props.errorMessage}
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

const headerStyles = (theme: Theme) => css`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${theme.space.md};
`
