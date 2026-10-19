import '@emotion/react'
import type { AppTheme } from './theme.ts'

// Types the `theme` argument in every Emotion style function.
declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
