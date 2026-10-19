import './Footer.css'

function Footer() {
  return (
    <div className="footer">
      <div className="actions">
        <button type="button">Cancel</button>
        <button type="submit">Save draft</button>
        <button type="button">Publish update</button>
      </div>

      {/* Live region for the save confirmation. It must be in the DOM before
          the message is added so screen readers announce it. */}
      <p role="status" className="status"></p>
    </div>
  )
}

export default Footer
