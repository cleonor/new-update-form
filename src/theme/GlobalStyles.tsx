import { css, Global } from '@emotion/react'
import type { Theme } from '@emotion/react'

function GlobalStyles() {
  return <Global styles={globalStyles} />
}

export default GlobalStyles

const globalStyles = (theme: Theme) => css`
  body {
    margin: 0;
    font-family: ${theme.fonts.body};
  }

  h1,
  h2,
  h3 {
    font-family: ${theme.fonts.bold};
    font-weight: 700;
  }

  :focus-visible {
    outline: 3px solid ${theme.colors.focus};
    outline-offset: 2px;
  }
`
