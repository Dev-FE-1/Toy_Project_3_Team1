import React from 'react'
import styled from '@emotion/styled'
import { colors } from '@/constants/color'

interface RecommendedKeywordProps {
  keyword: string
  onClick: (keyword: string) => void
}

export const Keywords = [
  '뉴진스',
  '방탄소년단',
  '르쎄라핌',
  '데이식스',
  '에스파',
  '엑소',
  '트와이스',
  '아이유',
  '블랙핑크',
  '마마무',
  '빅뱅',
  '워너원',
  '(여자)아이들',
  '이무진',
]

export const RecommendedKeyword: React.FC<RecommendedKeywordProps> = ({ keyword, onClick }) => {
  return <Keyword onClick={() => onClick(keyword)}>{keyword}</Keyword>
}

const Keyword = styled.p`
  display: inline-block;
  padding: 10px;
  margin: 5px;
  border: 1px solid ${colors.mediumPurple};
  color: ${colors.white};
  background-color: ${colors.mediumPurple};
  border-radius: 15px;
  cursor: pointer;
`
