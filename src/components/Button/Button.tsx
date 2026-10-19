import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import type { ComponentProps } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'link'

type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariant
}

function Button(props: ButtonProps) {
  // variant isn't a <button> attribute, so keep it out of the spread.
  const { variant, ...buttonProps } = props

  return (
    <button
      type="button"
      {...buttonProps}
      css={[baseStyles, variantStyles[variant ?? 'secondary']]}
    />
  )
}

export default Button

const baseStyles = (theme: Theme) => css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.space.sm};
  min-height: 3rem;
  padding: 0 ${theme.space.lg};
  border: 2px solid transparent;
  border-radius: ${theme.radii.pill};
  font: inherit;
  font-family: ${theme.fonts.bold};
  cursor: pointer;
`

const variantStyles = {
  // White on orange is 4.9:1.
  primary: (theme: Theme) => css`
    background: ${theme.colors.accent};
    color: ${theme.colors.surface};

    &:hover {
      background: color-mix(in srgb, ${theme.colors.accent} 85%, black);
    }
  `,
  // Purple text is 7.6:1 on white; the border is 4.2:1.
  secondary: (theme: Theme) => css`
    background: ${theme.colors.surface};
    color: ${theme.colors.brand};
    border-color: ${theme.colors.brandBorder};

    &:hover {
      background: color-mix(in srgb, ${theme.colors.brand} 8%, white);
    }
  `,
  link: (theme: Theme) => css`
    padding: 0 ${theme.space.sm};
    background: none;
    color: ${theme.colors.text};
    font-family: ${theme.fonts.medium};
    text-decoration: underline;
    text-underline-offset: 0.2em;

    &:hover {
      text-decoration-thickness: 2px;
    }
  `,
}
