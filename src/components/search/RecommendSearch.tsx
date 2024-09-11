import { RecommendedKeyword } from '@/components/search/RecommendKeyword'
import { fontSize, fontWeight } from '@/styles/font'
import styled from '@emotion/styled'

type RecommendSearchProps = {
  recommendedKeywords: string[]
  setSearchTag: (tag: string) => void
}

const RecommendSearch = ({ recommendedKeywords, setSearchTag }: RecommendSearchProps) => (
  <Container>
    <div className="recommend-search">
      추천 검색어
      <div className="recommend-keyword">
        {recommendedKeywords.map((keyword) => (
          <RecommendedKeyword key={keyword} keyword={keyword} onClick={setSearchTag} />
        ))}
      </div>
    </div>
  </Container>
)

export default RecommendSearch

const Container = styled.div`
  .recommend-search {
    padding: 10% 3% 0 3%;
    font-size: ${fontSize.xl};
    font-weight: ${fontWeight.bold};
  }
  .recommend-keyword {
    padding-top: 5%;
    cursor: pointer;
  }
`
