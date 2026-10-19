import { describe, expect, it, vi } from 'vitest'
import { clearDraft, loadDraft, saveDraft } from './draftStorage.ts'

const fields = {
  title: 'Release',
  content: 'Shipped it',
  author: 'Sam',
  isAuthorEditable: true,
}

describe('draftStorage', () => {
  it('saves the draft with a timestamp and loads it back', () => {
    const saved = saveDraft(fields)

    expect(saved).toMatchObject(fields)
    expect(saved?.savedAt).toEqual(expect.any(String))
    expect(loadDraft()).toEqual(saved)
  })

  it('clears the saved draft', () => {
    saveDraft(fields)

    clearDraft()

    expect(loadDraft()).toBeNull()
  })

  it('does not throw when the browser blocks clearing', () => {
    vi.spyOn(Storage.prototype, 'removeItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })

    expect(() => clearDraft()).not.toThrow()
  })

  it('returns null when nothing is saved', () => {
    expect(loadDraft()).toBeNull()
  })

  it('returns null when the stored value is not valid JSON', () => {
    localStorage.setItem('update-draft', '{not json')

    expect(loadDraft()).toBeNull()
  })

  it('returns null when the browser refuses to store the draft', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })

    expect(saveDraft(fields)).toBeNull()
  })
})
