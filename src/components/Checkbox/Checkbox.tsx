import { css } from '@emotion/react'
import type { Theme } from '@emotion/react'
import { useCallback, useId } from 'react'
import type { ComponentProps, KeyboardEvent } from 'react'
import { joinIds } from '../joinIds.ts'

// Accepts every native checkbox attribute (disabled, name, checked, onChange, …).
// `isSwitch` announces it as an on/off switch to screen readers.
// `infoText` is shown below and read as the checkbox's description.
// `align` places the control at the start (default) or end of its container.
type CheckboxProps = Omit<ComponentProps<'input'>, 'id' | 'type' | 'role'> & {
  label: string
  isSwitch?: boolean
  infoText?: string
  align?: 'start' | 'end'
}

function Checkbox(props: CheckboxProps) {
  // label, isSwitch, infoText and align aren't <input> attributes, so keep them out of the spread.
  const { label, isSwitch, infoText, align, ...inputProps } = props
  const onKeyDown = props.onKeyDown
  const id = useId()
  const infoId = useId()

  // Checkboxes only toggle on Space natively; also toggle on Enter. Clicking the
  // input fires the usual onChange, and preventing the default stops Enter from
  // submitting the surrounding form.
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      onKeyDown?.(event)
      if (event.key !== 'Enter' || event.defaultPrevented) return
      event.preventDefault()
      if (!event.repeat) event.currentTarget.click()
    },
    [onKeyDown],
  )

  return (
    <div css={containerStyles}>
      <div css={controlRowStyles(align ?? 'start')}>
        <input
          {...inputProps}
          id={id}
          type="checkbox"
          role={isSwitch ? 'switch' : undefined}
          css={[disabledStyles, isSwitch && switchStyles]}
          aria-describedby={joinIds(
            inputProps['aria-describedby'],
            infoText && infoId,
          )}
          onKeyDown={handleKeyDown}
        />
        <label htmlFor={id}>{label}</label>
      </div>
      {infoText && (
        <p id={infoId} css={infoStyles}>
          {infoText}
        </p>
      )}
    </div>
  )
}

export default Checkbox

const containerStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  gap: ${theme.space.xs};
`

const controlRowStyles = (align: 'start' | 'end') => (theme: Theme) => css`
  display: flex;
  align-self: ${align === 'end' ? 'flex-end' : 'flex-start'};
  align-items: center;
  gap: ${theme.space.sm};
`

const disabledStyles = css`
  &:disabled,
  &:disabled + label {
    cursor: not-allowed;
  }
`

// A track with a sliding thumb. The thumb's position shows the state,
// so it doesn't rely on colour alone.
const switchStyles = (theme: Theme) => css`
  appearance: none;
  position: relative;
  flex-shrink: 0;
  width: 2.75rem;
  height: 1.5rem;
  margin: 0;
  border: 1px solid ${theme.colors.switch};
  border-radius: ${theme.radii.pill};
  background: ${theme.colors.surface};
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: calc(1.5rem - 6px);
    height: calc(1.5rem - 6px);
    border: 1px solid ${theme.colors.switch};
    border-radius: 50%;
    background: ${theme.colors.surface};
    transition: transform 0.15s ease-out;
  }

  &:checked {
    background: ${theme.colors.switch};
  }

  &:checked::before {
    transform: translateX(1.25rem);
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      transition: none;
    }
  }
`

const infoStyles = (theme: Theme) => css`
  margin: 0;
  font-size: ${theme.fontSizes.small};
  color: ${theme.colors.mutedText};
  text-align: right;
`
