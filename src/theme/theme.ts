import { palette } from './palette.ts'

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
    text: palette.gray900, // 17.4:1 on white
    surface: palette.white,
    mutedText: palette.gray600, // 7:1 on white, 6.2:1 on readOnlyBackground
    border: palette.gray900,
    readOnlyBackground: palette.purple50,
    readOnlyBorder: palette.gray400, // 3.4:1 on white, 3:1 on readOnlyBackground
    brand: palette.purple700, // 7.6:1 on white, also with white text on it
    brandBorder: palette.purple400, // 4.2:1 on white
    accent: palette.orange600, // white text on it is 4.9:1
    focus: palette.blue600, // 6:1 on white
    backdrop: palette.overlay,
    // Text on its own background, all WCAG AA: neutral 9.5:1, brand 6.4:1,
    // accent 6.6:1, info, success, warning and error 4.5:1 or more.
    intents: {
      neutral: { text: palette.gray800, background: palette.gray100 },
      brand: { text: palette.purple700, background: palette.purple100 },
      accent: { text: palette.orange800, background: palette.orange100 },
      info: { text: palette.blue800, background: palette.blue100 },
      success: { text: palette.green800, background: palette.green100 },
      warning: { text: palette.amber800, background: palette.amber100 },
      error: { text: palette.red700, background: palette.red100 },
    },
  },
}

export type AppTheme = typeof theme
export type Intent = keyof AppTheme['colors']['intents']
