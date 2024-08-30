import { FC, ReactNode } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
import { colors } from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'

type ButtonSize = 'small' | 'normal'
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text'

export interface IButtonLinkProps {
  children: ReactNode
  to: string
  size?: ButtonSize
  variant?: ButtonVariant
  buttonWidth?: string
  disabled?: boolean
}

const ButtonLink: FC<IButtonLinkProps> = ({
  children,
  to,
  size = 'normal',
  variant = 'primary',
  buttonWidth = '100%',
  disabled = false,
}) => {
  return (
    <ButtonLinkComponent
      to={disabled ? '#' : to}
      size={size}
      variant={variant}
      buttonWidth={buttonWidth}
      disabled={disabled}
    >
      {children}
    </ButtonLinkComponent>
  )
}

export default ButtonLink

const baseStyles = css`
  font-weight: ${fontWeight.medium};
  border-radius: 8px;
  border: none;
  outline: none;
  text-align: center;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`

const themeColors: Record<ButtonVariant, string> = {
  primary: colors.primaryPurple,
  secondary: colors.brightGray,
  outline: colors.white,
  text: 'transparent',
}

const themeTextColors: Record<ButtonVariant, string> = {
  primary: colors.white,
  secondary: colors.darkGray,
  outline: colors.darkGray,
  text: colors.darkGray,
}

const themeHoverColors: Record<ButtonVariant, string> = {
  primary: colors.primaryPurpleHover,
  secondary: colors.brightGrayHover,
  outline: colors.lightestGray,
  text: colors.primaryPurpleHover,
}

const sizeStyles = {
  small: {
    height: '30px',
    padding: '6px',
    fontSize: `${fontSize.sm}`,
  },
  normal: {
    height: '50px',
    padding: '16px',
    fontSize: `${fontSize.md}`,
  },
}

const ButtonLinkComponent = styled(Link)<{
  size: ButtonSize
  variant: ButtonVariant
  buttonWidth?: string
  disabled?: boolean
}>`
  ${baseStyles};
  width: ${({ buttonWidth }) => buttonWidth};
  height: ${({ size }) => sizeStyles[size].height};
  padding: ${({ size }) => sizeStyles[size].padding};
  background-color: ${({ variant }) => themeColors[variant]};
  color: ${({ variant }) => themeTextColors[variant]};
  border: ${({ variant }) => (variant === 'outline' ? `1px solid ${colors.black}` : 'none')};
  font-weight: ${({ variant }) => (variant === 'primary' ? fontWeight.bold : fontWeight.medium)};
  font-size: ${({ size }) => sizeStyles[size].fontSize};
  transition:
    background-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    ${({ variant }) =>
      variant === 'text' &&
      `
      color: ${themeHoverColors.text};
    `}
    ${({ variant, disabled }) =>
      variant !== 'text' &&
      !disabled &&
      `
      background-color: ${themeHoverColors[variant]};
    `}
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.4;
  }
`
