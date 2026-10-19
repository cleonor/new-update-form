import './Footer.css'

type FooterProps = {
  statusMessage: string
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
        {props.statusMessage}
      </p>
    </div>
  )
}

export default Footer
