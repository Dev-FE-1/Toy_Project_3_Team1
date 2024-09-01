import { CSSProperties, FC, ReactNode } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { colors } from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'

type ButtonSize = 'small' | 'normal'
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text'

export interface ButtonProps {
  children: ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  size?: ButtonSize
  variant?: ButtonVariant
  buttonWidth?: CSSProperties['width']
  disabled?: boolean
}

type ButtonComponentProps = Pick<ButtonProps, 'size' | 'variant' | 'buttonWidth' | 'disabled'>

const Button: FC<ButtonProps> = ({
  children,
  onClick,
  size = 'normal',
  variant = 'primary',
  buttonWidth = '100%',
  disabled = false,
}) => {
  return (
    <ButtonComponent
      onClick={onClick}
      size={size}
      variant={variant}
      buttonWidth={buttonWidth}
      disabled={disabled}
    >
      {children}
    </ButtonComponent>
  )
}

export default Button

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

const ButtonComponent = styled.button<ButtonComponentProps>`
  ${baseStyles};
  width: ${({ buttonWidth }) => buttonWidth};
  height: ${({ size = 'normal' }) => sizeStyles[size].height};
  padding: ${({ size = 'normal' }) => sizeStyles[size].padding};
  background-color: ${({ variant = 'primary' }) => themeColors[variant]};
  color: ${({ variant = 'primary' }) => themeTextColors[variant]};
  border: ${({ variant }) => (variant === 'outline' ? `1px solid ${colors.black}` : 'none')};
  font-weight: ${({ variant }) => (variant === 'primary' ? fontWeight.bold : fontWeight.medium)};
  font-size: ${({ size = 'normal' }) => sizeStyles[size].fontSize};
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
    ${({ variant = 'primary', disabled }) =>
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
