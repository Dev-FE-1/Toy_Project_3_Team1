import React, { forwardRef } from 'react'
import styled from '@emotion/styled'
import { InputProps } from './Input'
import { colors } from '@/styles/colors'

export interface LineInputProps extends InputProps {
  lineType?: 'thin' | 'thick' | 'none'
}

const LineInput = React.memo(
  forwardRef<HTMLInputElement, LineInputProps>(({ lineType = 'none', ...rest }, ref) => (
    <LineInputComponent lineType={lineType} {...rest} ref={ref} />
  ))
)

const LineInputComponent = styled.input<{ lineType?: 'thin' | 'thick' | 'none' }>`
  height: 50px;
  padding: 0 !important;
  border: none !important;
  border-bottom: ${({ lineType }) =>
      lineType === 'thin' ? '2px' : lineType === 'thick' ? '3px' : '0px'}
    solid ${colors.lightGray} !important;
  border-radius: 0 !important;
  color: ${colors.black};

  ::placeholder {
    color: ${colors.gray};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    border-color: ${colors.lightestGray};
    background-color: ${colors.lightestGray};
    color: ${colors.black};
  }
`

export default LineInput

LineInput.displayName = 'LineInput'
