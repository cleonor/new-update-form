import type { DraftFields } from '../storage/draftStorage.ts'

// Stands in for the logged-in user's name until there's real account data.
export const DEFAULT_AUTHOR = 'Petra Petitionsstarterin'

// The name the update is saved and published under: the custom name while
// "Change author" is on, otherwise the default. The custom name stays in
// `fields.author` either way, so switching back on restores it.
export function getAuthorName(fields: DraftFields): string {
  return fields.isAuthorEditable ? fields.author : DEFAULT_AUTHOR
}
