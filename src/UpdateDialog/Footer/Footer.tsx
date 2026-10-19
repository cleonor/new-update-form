import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import Button from '../../components/Button/Button.tsx'
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
  // The pill for the current status, or nothing when there isn't one.
  const statusTag = props.status ? (
    <Tag intent={statusIntents[props.status.kind]}>{props.status.message}</Tag>
  ) : null

  return (
    <div css={footerStyles}>
      {/* Live region for status messages. It's always in the DOM, with room for
          one pill, so screen readers announce each message and the dialog
          doesn't change height when one appears. */}
      <p role="status" css={statusStyles}>
        {statusTag}
      </p>

      <div css={actionsStyles}>
        <Button variant="link" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button variant="secondary" type="submit">
          Save draft
        </Button>
        <Button variant="primary" onClick={props.onPublish}>
          Publish update
        </Button>
      </div>
    </div>
  )
}

export default Footer

const statusIntents: Record<FormStatusKind, TagIntent> = {
  draftSaved: 'brand',
  draftNotSaved: 'error',
  cleared: 'neutral',
  published: 'accent',
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
