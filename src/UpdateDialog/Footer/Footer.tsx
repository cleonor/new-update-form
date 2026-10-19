import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import type { ComponentType } from 'react'
import Button from '../../components/Button/Button.tsx'
import CheckIcon from '../../components/icons/CheckIcon.tsx'
import CircleAlertIcon from '../../components/icons/CircleAlertIcon.tsx'
import CircleCheckIcon from '../../components/icons/CircleCheckIcon.tsx'
import SendIcon from '../../components/icons/SendIcon.tsx'
import UndoIcon from '../../components/icons/UndoIcon.tsx'
import Tag from '../../components/Tag/Tag.tsx'
import type { TagIntent } from '../../components/Tag/Tag.tsx'

export type FormStatusKind = 'draftSaved' | 'draftNotSaved' | 'cleared' | 'published'

export type FormStatus = {
  kind: FormStatusKind
  message: string
}

type FooterProps = {
  status: FormStatus | null
  onCancel: () => void
  onPublish: () => void
}

function Footer(props: FooterProps) {
  const appearance = props.status && statusAppearance[props.status.kind]

  return (
    <div css={footerStyles}>
      {/* Live region for status messages. It's always in the DOM, with room for
          one pill, so screen readers announce each message and the dialog
          doesn't change height when one appears. */}
      <p role="status" css={statusStyles}>
        {props.status && appearance && (
          <Tag intent={appearance.intent} icon={<appearance.Icon />}>
            {props.status.message}
          </Tag>
        )}
      </p>

      <div css={actionsStyles}>
        <Button variant="link" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button variant="secondary" type="submit">
          Save draft
        </Button>
        <Button variant="primary" onClick={props.onPublish}>
          <SendIcon />
          Publish update
        </Button>
      </div>
    </div>
  )
}

export default Footer

const statusAppearance: Record<
  FormStatusKind,
  { intent: TagIntent; Icon: ComponentType }
> = {
  draftSaved: { intent: 'brand', Icon: CheckIcon },
  draftNotSaved: { intent: 'error', Icon: CircleAlertIcon },
  cleared: { intent: 'neutral', Icon: UndoIcon },
  published: { intent: 'accent', Icon: CircleCheckIcon },
}

const footerStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.sm};
`

// Fixed height that fits one pill, so showing or hiding it never moves the buttons.
const statusStyles = css`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  min-height: 2rem;
  margin: 0;
`

const actionsStyles = (theme: Theme) => css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: ${theme.space.md};
`
