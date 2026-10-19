import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type {
  ChangeEvent,
  KeyboardEvent,
  SubmitEvent,
  SyntheticEvent,
} from 'react'
import { clearDraft, saveDraft } from '../storage/draftStorage.ts'
import type { DraftFields } from '../storage/draftStorage.ts'
import Author from './Author/Author.tsx'
import Footer from './Footer/Footer.tsx'
import type { FormStatus } from './Footer/Footer.tsx'
import Title from './Title/Title.tsx'
import Update from './Update/Update.tsx'

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
  const [status, setStatus] = useState<FormStatus | null>(null)

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

  // Clears the text fields and the saved draft; the author switch keeps its
  // position. The status message tells screen reader users something happened.
  const handleCancelClick = useCallback(() => {
    setFields((current) => ({ ...current, title: '', content: '', author: '' }))
    clearDraft()
    setStatus({ kind: 'cleared', message: 'Form cleared.' })
  }, [])

  // Publishing isn't implemented yet; for now it only confirms the click.
  const handlePublishClick = useCallback(() => {
    setStatus({ kind: 'published', message: 'Published' })
  }, [])

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
      setStatus(
        draft
          ? {
              kind: 'draftSaved',
              message: `Draft saved at ${new Date(draft.savedAt).toLocaleTimeString()}.`,
            }
          : {
              kind: 'draftNotSaved',
              message:
                "Draft couldn't be saved. Your browser's storage may be full or blocked.",
            },
      )
    },
    [fields],
  )

  return (
    <dialog
      ref={dialogRef}
      css={dialogStyles}
      aria-labelledby={headingId}
      onKeyDown={handleKeyDown}
      onCancel={handleCancel}
    >
      <form css={formStyles} onSubmit={handleSubmit}>
        <h1 id={headingId}>New update</h1>
        <Title value={fields.title} onChange={handleTitleChange} />
        <Update value={fields.content} onChange={handleContentChange} />
        <Author
          value={fields.author}
          isEditable={fields.isAuthorEditable}
          onChange={handleAuthorChange}
          onEditableChange={handleAuthorEditableChange}
        />
        <Footer
          status={status}
          onCancel={handleCancelClick}
          onPublish={handlePublishClick}
        />
      </form>
    </dialog>
  )
}

export default UpdateDialog

// Taller content (e.g. a resized textarea) scrolls inside the dialog.
const dialogStyles = (theme: Theme) => css`
  width: min(36rem, calc(100vw - 2rem));
  max-height: 80vh;
  max-height: 80dvh;
  overflow-y: auto;
  padding: ${theme.space.xl};
  border: none;
  border-radius: ${theme.radii.default};
  background: ${theme.colors.surface};

  &::backdrop {
    background: ${theme.colors.backdrop};
  }
`

const formStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.lg};

  h1 {
    margin: 0;
  }
`
