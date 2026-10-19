import { useCallback, useEffect, useId, useRef } from 'react'
import type { KeyboardEvent, SubmitEvent, SyntheticEvent } from 'react'
import Author from './Author/Author.tsx'
import Footer from './Footer/Footer.tsx'
import Title from './Title/Title.tsx'
import Update from './Update/Update.tsx'
import './UpdateDialog.css'

function UpdateDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const headingId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  // The dialog must stay open, so block Escape. Chrome ignores a cancelled
  // `cancel` event on a repeated Escape press, so stop the key itself too.
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDialogElement>) => {
      if (event.key === 'Escape') event.preventDefault()
    },
    [],
  )

  const handleCancel = useCallback(
    (event: SyntheticEvent<HTMLDialogElement>) => {
      event.preventDefault()
    },
    [],
  )

  const handleSubmit = useCallback((event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: store the draft in localStorage and show the success message.
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="update-dialog"
      aria-labelledby={headingId}
      onKeyDown={handleKeyDown}
      onCancel={handleCancel}
    >
      <form className="update-form" onSubmit={handleSubmit}>
        <h1 id={headingId}>New update</h1>
        <Title />
        <Update />
        <Author />
        <Footer />
      </form>
    </dialog>
  )
}

export default UpdateDialog
