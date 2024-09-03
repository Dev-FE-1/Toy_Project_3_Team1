import RecommendedKeyword from '@/components/search/RecommendKeyword'

type RecommendSearchProps = {
  recommendedKeywords: string[]
  setSearchTag: (tag: string) => void
}

const RecommendSearch = ({ recommendedKeywords, setSearchTag }: RecommendSearchProps) => (
  <div className="recomand-search">
    <h3>추천 검색어</h3>
    <div className="recomand-keyword">
      {recommendedKeywords.map((keyword) => (
        <RecommendedKeyword key={keyword} keyword={keyword} onClick={setSearchTag} />
      ))}
    </div>
  </div>
)

export default RecommendSearch
