import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { colors } from '@/styles/colors'
import getRecommendTags from '@/service/search/getRecommendTags'
import { fontSize, fontWeight } from '@/styles/font'

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
  padding: 8px;
  margin: 5px;
  color: ${colors.primaryPurple};
  background-color: ${colors.lightPurPle};
  font-weight: ${fontWeight.semiBold};
  font-size: ${fontSize.md};
  border-radius: 20px;
  cursor: pointer;
`
