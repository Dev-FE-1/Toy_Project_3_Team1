import { RecommendedKeyword } from '@/components/search/RecommendKeyword'
import styled from '@emotion/styled'

type RecommendSearchProps = {
  recommendedKeywords: string[]
  setSearchTag: (tag: string) => void
}

const RecommendSearch = ({ recommendedKeywords, setSearchTag }: RecommendSearchProps) => (
  <Container>
    <div className="recommend-search">
      <h3>추천 검색어</h3>
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
    padding: 15% 3% 0 3%;
  }
  .recommend-keyword {
    padding-top: 5%;
    cursor: pointer;
  }
`
