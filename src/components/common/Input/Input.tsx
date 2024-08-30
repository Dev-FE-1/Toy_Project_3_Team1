import React, { forwardRef } from 'react'
import styled from '@emotion/styled'
import { colors } from '@/constants/color'
import { CSSProperties } from 'react'

export interface IInputProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  name?: string
  inputWidth?: CSSProperties['width']
  placeholder?: string
  type?: 'text' | 'password' | 'date'
  disabled?: boolean
  className?: string
}

const Input = React.memo(
  forwardRef<HTMLInputElement, IInputProps>(
    (
      {
        value,
        onChange,
        onKeyDown,
        name,
        inputWidth = '100%',
        placeholder = '',
        type = 'text',
        disabled = false,
        className,
      },
      ref
    ) => (
      <InputComponent
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        name={name}
        inputWidth={inputWidth}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        className={className}
        ref={ref}
      />
    )
  )
)

const InputComponent = styled.input<Pick<IInputProps, 'inputWidth'>>`
  width: ${(props) => props.inputWidth};
  height: 50px;
  padding: 12px;
  border: 1px solid ${colors.lightGray};
  border-radius: 8px;
  color: ${colors.black};

  ::placeholder {
    color: ${colors.gray};
  }

  &:hover {
    background-color: ${colors.lightestGray};
  }

  &:focus {
    outline: none;
    border: 1px solid ${colors.primaryPurple};
  }

  &:disabled {
    border-color: ${colors.lightestGray};
    background-color: ${colors.lightestGray};
    color: ${colors.black};
  }
`

export default Input

Input.displayName = 'Input'
