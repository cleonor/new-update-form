// Test-only helper, never hot-reloaded, so mixing exports here is fine.
/* oxlint-disable react/only-export-components */
import { ThemeProvider } from '@emotion/react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { ReactElement, ReactNode } from 'react'
import { theme } from '../theme/theme.ts'

type ThemeWrapperProps = {
  children: ReactNode
}

function ThemeWrapper(props: ThemeWrapperProps) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
}

// Testing Library's render, wrapped in the app's theme so Emotion styles resolve.
function renderWithTheme(ui: ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: ThemeWrapper, ...options })
}

export * from '@testing-library/react'
export { renderWithTheme as render }
