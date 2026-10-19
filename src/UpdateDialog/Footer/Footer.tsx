import Tag from '../../components/Tag/Tag.tsx'
import type { TagIntent } from '../../components/Tag/Tag.tsx'
import './Footer.css'

export type SaveStatus = {
  message: string
  intent: TagIntent
}

type FooterProps = {
  status: SaveStatus | null
}

function Footer(props: FooterProps) {
  return (
    <div className="footer">
      <div className="actions">
        <button type="button">Cancel</button>
        <button type="submit">Save draft</button>
        <button type="button">Publish update</button>
      </div>

      {/* Live region for the save confirmation. It's always in the DOM so
          screen readers announce the message when it changes. */}
      <p role="status" className="status">
        {props.status && (
          <Tag intent={props.status.intent}>{props.status.message}</Tag>
        )}
      </p>
    </div>
  )
}

export default Footer
