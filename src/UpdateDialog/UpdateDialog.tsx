import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type {
  ChangeEvent,
  KeyboardEvent,
  SubmitEvent,
  SyntheticEvent,
} from 'react'
import { saveDraft } from '../storage/draftStorage.ts'
import type { DraftFields } from '../storage/draftStorage.ts'
import Author from './Author/Author.tsx'
import Footer from './Footer/Footer.tsx'
import Title from './Title/Title.tsx'
import Update from './Update/Update.tsx'
import './UpdateDialog.css'

const EMPTY_FIELDS: DraftFields = {
  title: '',
  content: '',
  author: '',
  isAuthorEditable: false,
}

function UpdateDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const headingId = useId()
  const [fields, setFields] = useState<DraftFields>(EMPTY_FIELDS)
  const [statusMessage, setStatusMessage] = useState('')

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

  const handleTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const title = event.target.value
      setFields((current) => ({ ...current, title }))
    },
    [],
  )

  const handleContentChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const content = event.target.value
      setFields((current) => ({ ...current, content }))
    },
    [],
  )

  const handleAuthorChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const author = event.target.value
      setFields((current) => ({ ...current, author }))
    },
    [],
  )

  const handleAuthorEditableChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const isAuthorEditable = event.target.checked
      setFields((current) => ({ ...current, isAuthorEditable }))
    },
    [],
  )

  // The time makes each message different, so screen readers announce every save.
  const handleSubmit = useCallback(
    (event: SubmitEvent<HTMLFormElement>) => {
      event.preventDefault()
      // The name stays visible while editing is off, but a custom author only
      // applies while editing is on, so it's left out of the saved draft.
      const draft = saveDraft({
        ...fields,
        author: fields.isAuthorEditable ? fields.author : '',
      })
      setStatusMessage(
        draft
          ? `Draft saved at ${new Date(draft.savedAt).toLocaleTimeString()}.`
          : "Draft couldn't be saved. Your browser's storage may be full or blocked.",
      )
    },
    [fields],
  )

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
        <Title value={fields.title} onChange={handleTitleChange} />
        <Update value={fields.content} onChange={handleContentChange} />
        <Author
          value={fields.author}
          isEditable={fields.isAuthorEditable}
          onChange={handleAuthorChange}
          onEditableChange={handleAuthorEditableChange}
        />
        <Footer statusMessage={statusMessage} />
      </form>
    </dialog>
  )
}

export default UpdateDialog
