import { useState } from 'react'
import { Playlist, SearchTag } from '@/service/search/searchTag'
import styled from '@emotion/styled'
import Input from '@/components/common/Input/Input'
import { colors } from '@/styles/colors'
import RecommendSearch from '@/components/search/RecommendSearch'
import { Keywords } from '@/components/search/RecommendKeyword'
import SearchFail from '@/components/search/SearchFail'
import SearchSuccess from '@/components/search/SearchSuccess'
import { SearchIcon } from 'lucide-react'

const SearchPage = () => {
  const [searchTag, setSearchTag] = useState('')
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [previousSearchTag, setPreviousSearchTag] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!searchTag.trim()) {
      setHasSearched(false)
      return
    }

    const formattedSearchTag = !searchTag.startsWith('#') ? '#' + searchTag : searchTag
    const results = await SearchTag(formattedSearchTag)
    setPlaylists(results)
    setHasSearched(true)
    setPreviousSearchTag(searchTag)
    setSearchTag('')
  }

  const recommendedKeywords = Keywords()

  return (
    <Container>
      <div className="search-tag">
        <Input
          className="search-input"
          type="text"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          placeholder="플레이리스트 관련 태그 검색"
          button={<SearchIcon />}
          onClick={handleSearch}
        />
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
    position: relative;
    width: 100%;
    margin-bottom: 5px;
    padding: 16px 18px;
    border: 1px solid ${colors.lightGray};
    border-radius: 10px;
  }
`
