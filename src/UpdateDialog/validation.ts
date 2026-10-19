import type { DraftFields } from '../storage/draftStorage.ts'
import { getAuthorName } from './author.ts'

// Keys match the fields' `name` attributes, so the dialog can find and focus them.
export type FieldErrors = Partial<Record<'title' | 'content' | 'author', string>>

// No form value may be empty (text with only spaces counts as empty). Used for
// both Save draft and Publish update. Errors are added in form order, so the
// first key is the first invalid field.
export function validateFields(fields: DraftFields): FieldErrors {
  const errors: FieldErrors = {}

  if (!fields.title.trim()) errors.title = 'Enter a title'
  if (!fields.content.trim()) errors.content = 'Write your update'
  if (!getAuthorName(fields).trim()) errors.author = 'Enter an author name'

  return errors
}
