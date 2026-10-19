const STORAGE_KEY = 'update-draft'

export type DraftFields = {
  title: string
  content: string
  author: string
  isAuthorEditable: boolean
}

export type Draft = DraftFields & {
  savedAt: string
}

// Returns the saved draft, or null if the browser refused to store it
// (storage full, or blocked e.g. in some private browsing modes).
export function saveDraft(fields: DraftFields): Draft | null {
  const draft: Draft = { ...fields, savedAt: new Date().toISOString() }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    return draft
  } catch {
    return null
  }
}

export function loadDraft(): Draft | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as Draft) : null
  } catch {
    return null
  }
}
