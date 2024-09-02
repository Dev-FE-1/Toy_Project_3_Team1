import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Playlist, SearchTag } from '@/api/playlist/searchTag'
import styled from '@emotion/styled'
import Input from '@/components/common/Input/Input'
import { colors } from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'
import RecommendedKeyword from '@/components/search/RecommandKeyword'
import PlaylistThumbnails from '@/components/search/PlaylistThumbnails'

type RecommendedSearchProps = {
  recommendedKeywords: string[]
  setSearchTag: (tag: string) => void
}

const RecommendedSearch = ({ recommendedKeywords, setSearchTag }: RecommendedSearchProps) => (
  <div className="recomand-search">
    <h3>추천 검색어</h3>
    <div className="recomand-keyword">
      {recommendedKeywords.map((keyword) => (
        <RecommendedKeyword key={keyword} keyword={keyword} onClick={setSearchTag} />
      ))}
    </div>
  </div>
)

const SearchFail = ({ previousSearchTag }: { previousSearchTag: string }) => (
  <div className="search-fail">
    <h3 className="fail-title">검색 태그 : {previousSearchTag}</h3>
    <div className="fail-text">
      죄송합니다.
      <br />
      &quot;{previousSearchTag}&quot; 에 <br />
      해당하는 플레이리스트를 <br />
      찾을 수 없습니다.
    </div>
  </div>
)

const PlaylistItem = ({ playlist }: { playlist: Playlist }) => (
  <Link to={`/playlist/${playlist.id}`}>
    <div className="success-img">
      <PlaylistThumbnails playlistId={playlist.id} />
    </div>
    <li className="success-title" key={playlist.id}>
      <h4>{playlist.title}</h4>
    </li>
  </Link>
)

const SearchSuccess = ({
  previousSearchTag,
  playlists,
}: {
  previousSearchTag: string
  playlists: Playlist[]
}) => (
  <>
    <h3 className="success-tag">검색 태그 : {previousSearchTag}</h3>
    <ul className="search-success">
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </ul>
  </>
)

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

  const recommendedKeywords = [
    '뉴진스',
    '르쎄라핌',
    '데이식스',
    '김민태',
    '에스파',
    '(여자)아이들',
    '이무진',
    '방탄소년단',
  ]

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
          <RecommendedSearch
            recommendedKeywords={recommendedKeywords}
            setSearchTag={setSearchTag}
          />
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
  }
  .fail-title {
    padding: 15% 0 15% 0;
    align-items: center;
    text-align: center;
    font-size: ${fontSize.xl};
  }

  .fail-text {
    font-size: ${fontSize.lg};
    justify-content: center;
    text-align: center;
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
