import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { colors } from '@/constants/color'
import getRecommendTags from '@/service/search/getRecommendTags'

interface RecommendedKeywordProps {
  keyword: string
  onClick: (keyword: string) => void
}

export const Keywords = () => {
  const [tagkeywords, setTagkeywords] = useState<string[]>([])
  useEffect(() => {
    const fetchTags = async () => {
      const tags = await getRecommendTags()
      setTagkeywords(tags)
    }

    fetchTags()
  }, [])
  return tagkeywords
}

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
  border-radius: 20px;
  cursor: pointer;
`
