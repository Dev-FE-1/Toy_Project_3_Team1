import React, { forwardRef } from 'react'
import styled from '@emotion/styled'
import { colors } from '@/styles/colors'
import { CSSProperties } from 'react'

export interface InputProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: React.KeyboardEvent) => void
  onClick?: (event: React.MouseEvent) => void
  name?: string
  inputWidth?: CSSProperties['width']
  placeholder?: string
  type?: 'text' | 'password' | 'date'
  disabled?: boolean
  className?: string
  button?: React.ReactNode
}

type InputComponentProps = Pick<InputProps, 'inputWidth'>

const Input = React.memo(
  forwardRef<HTMLInputElement, InputProps>(
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
        button,
        onClick,
      },
      ref
    ) => (
      <InputWrapper inputWidth={inputWidth}>
        <InputComponent
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          name={name}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          className={className}
          ref={ref}
        />
        {button && (
          <div className="icon-btn" onClick={onClick}>
            {button}
          </div>
        )}
      </InputWrapper>
    )
  )
)

const InputWrapper = styled.div<InputComponentProps>`
  position: relative;
  width: ${(props) => props.inputWidth};

  .icon-btn {
    position: absolute;
    right: 10px;
    top: 10px;
    color: ${colors.black};
    border: none;
    cursor: pointer;
  }
`

const InputComponent = styled.input<InputComponentProps>`
  width: 100%;
  height: 50px;
  padding: 12px;
  padding-right: 40px;
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
