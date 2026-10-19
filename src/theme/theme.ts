// Design tokens, provided to every component through Emotion's ThemeProvider.
// Every text colour meets WCAG AA (4.5:1) on white and on its intent background;
// borders meet the 3:1 minimum for UI components.
export const theme = {
  fonts: {
    // From https://innn.it/fonts/expose-fonts.css (linked in index.html). Each weight
    // is its own family, so pick the family rather than setting font-weight.
    body: "'Soehne Buch', system-ui, sans-serif",
    medium: "'Soehne Kraeftig', system-ui, sans-serif",
    bold: "'Soehne Dreiviertelfett', system-ui, sans-serif",
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
  },
  fontSizes: {
    small: '0.875rem',
    heading: '1.5rem',
  },
  radii: {
    default: '0.5rem',
    pill: '999px',
  },
  colors: {
    surface: '#ffffff',
    mutedText: '#595959', // 7:1 on white
    border: '#767676', // 4.5:1 on white
    readOnlyBackground: '#f0f0f0',
    switch: '#333333', // 12.6:1 on white
    focus: '#005fcc',
    backdrop: 'rgb(0 0 0 / 0.5)',
    intents: {
      neutral: { text: '#333333', background: '#f0f0f0' },
      info: { text: '#0a4a8a', background: '#e6f0fb' },
      success: { text: '#1e6b34', background: '#e6f4ea' },
      warning: { text: '#7a4b00', background: '#fff4e0' },
      error: { text: '#a1261f', background: '#fdeaea' },
    },
  },
}

export type AppTheme = typeof theme
export type Intent = keyof AppTheme['colors']['intents']
