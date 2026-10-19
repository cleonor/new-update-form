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
    display: "'Soehne Schmal Dreiviertelfett', 'Arial Narrow', sans-serif",
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2.5rem',
  },
  fontSizes: {
    small: '0.875rem',
    display: '3rem',
  },
  radii: {
    default: '0.5rem',
    pill: '999px',
  },
  colors: {
    text: '#1a1a1a', // 17.4:1 on white
    surface: '#ffffff',
    mutedText: '#595959', // 7:1 on white, 6.2:1 on readOnlyBackground
    border: '#1a1a1a',
    readOnlyBackground: '#f3f0f8',
    readOnlyBorder: '#8e889c', // 3.4:1 on white, 3:1 on readOnlyBackground
    brand: '#5b34c9', // purple: 7.6:1 on white, also with white text on it
    brandBorder: '#8b5cf6', // 4.2:1 on white
    accent: '#b9531f', // orange: white text on it is 4.9:1
    focus: '#005fcc', // 6:1 on white
    backdrop: 'rgb(52 48 72 / 0.65)',
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
