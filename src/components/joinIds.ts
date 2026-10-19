// Combines element ids for attributes like aria-describedby, skipping empty ones.
export function joinIds(
  ...ids: Array<string | false | undefined>
): string | undefined {
  return ids.filter(Boolean).join(' ') || undefined
}
