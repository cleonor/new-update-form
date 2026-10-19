import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import Button from '../../components/Button/Button.tsx'
import SendIcon from '../../components/icons/SendIcon.tsx'
import Tag from '../../components/Tag/Tag.tsx'
import type { TagIntent } from '../../components/Tag/Tag.tsx'

export type SaveStatus = {
  message: string
  intent: TagIntent
}

type FooterProps = {
  status: SaveStatus | null
  onCancel: () => void
}

function Footer(props: FooterProps) {
  return (
    <div css={footerStyles}>
      <div css={actionsStyles}>
        <Button variant="link" onClick={props.onCancel}>
          Cancel
        </Button>
        <Button variant="secondary" type="submit">
          Save draft
        </Button>
        <Button variant="primary">
          <SendIcon />
          Publish update
        </Button>
      </div>

      {/* Live region for the save confirmation. It's always in the DOM so
          screen readers announce the message when it changes. */}
      <p role="status" css={statusStyles}>
        {props.status && (
          <Tag intent={props.status.intent}>{props.status.message}</Tag>
        )}
      </p>
    </div>
  )
}

export default Footer

const footerStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.md};
`

const actionsStyles = (theme: Theme) => css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: ${theme.space.md};
`

const statusStyles = css`
  margin: 0;
`
