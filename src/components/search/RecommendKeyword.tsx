import React from 'react'
import styled from '@emotion/styled'
import { colors } from '@/constants/color'

interface RecommendedKeywordProps {
  keyword: string
  onClick: (keyword: string) => void
}

const RecommendedKeyword: React.FC<RecommendedKeywordProps> = ({ keyword, onClick }) => {
  return <Keyword onClick={() => onClick(keyword)}>{keyword}</Keyword>
}

export default RecommendedKeyword

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
