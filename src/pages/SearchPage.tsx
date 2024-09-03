import { useState } from 'react'
import { Playlist, SearchTag } from '@/api/playlist/searchTag'
import styled from '@emotion/styled'
import Input from '@/components/common/Input/Input'
import { colors } from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'
import RecommendSearch from '@/components/search/RecommendSearch'
import { Keywords } from '@/components/search/RecommendKeyword'
import SearchFail from '@/components/search/SearchFail'
import SearchSuccess from '@/components/search/SearchSuccess'

const SearchPage = () => {
  const [searchTag, setSearchTag] = useState('')
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [previousSearchTag, setPreviousSearchTag] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!searchTag.trim()) return

    const results = await SearchTag(searchTag)
    setPlaylists(results)
    setHasSearched(true)
    setPreviousSearchTag(searchTag)
    setSearchTag('')
  }

  const recommendedKeywords = Keywords

  return (
    <Container>
      <div className="search-tag">
        <Input
          className="search-input"
          type="text"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          placeholder="플레이리스트 관련 태그 검색"
        />
        <button className="search-btn" type="button" onClick={handleSearch}>
          검색
        </button>
      </div>
      <div className="search-result">
        {!hasSearched ? (
          <RecommendSearch recommendedKeywords={recommendedKeywords} setSearchTag={setSearchTag} />
        ) : playlists.length === 0 ? (
          <SearchFail previousSearchTag={previousSearchTag} />
        ) : (
          <SearchSuccess previousSearchTag={previousSearchTag} playlists={playlists} />
        )}
      </div>
    </Container>
  )
}
export default SearchPage

const Container = styled.div`
  padding: 30px 20px 0 20px;
  margin-bottom: 16px;
  .search-tag {
    display: flex;
    gap: 10px;
  }
  .search-input {
    width: 100%;
    margin-bottom: 5px;
    padding: 16px 18px;
    border: 1px solid ${colors.lightGray};
    border-radius: 5px;
  }
  .search-btn {
    width: 100px;
    border: 1px solid ${colors.lightGray};
    color: ${colors.white};
    background-color: ${colors.primaryPurple};
    border-radius: 15px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .recomand-search {
    padding: 15% 3% 0 3%;
  }
  .recomand-keyword {
    padding-top: 5%;
    cursor: pointer;
  }
  .search-fail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(80vh - 100px);
    min-height: 300px;
    text-align: center;
  }
  .fail-title {
    padding: 15% 0;
    font-size: ${fontSize.xl};
  }
  .fail-text {
    font-size: ${fontSize.lg};
    font-weight: ${fontWeight.medium};
    line-height: 2;
  }
  .success-tag {
    padding-top: 5%;
    font-size: ${fontSize.xl};
    font-weight: ${fontWeight.bold};
    text-align: center;
    margin-bottom: 20px;
  }
  .search-success {
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
  }
  .success-img {
    display: flex;
    justify-content: center;
  }
  .success-title {
    padding: 10px 5px;
    margin-bottom: 20px;
    width: 100%;
    height: 50px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`
