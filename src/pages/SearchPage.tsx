import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Playlist, SearchTag } from '@/api/playlist/searchTag'
import styled from '@emotion/styled'
import Input from '@/components/common/Input/Input'
import { colors } from '@/constants/color'
import { fontSize, fontWeight } from '@/constants/font'
import RecommendedKeyword from '@/components/search/RecommandKeyword'
import PlaylistThumbnails from '@/components/search/PlaylistThumbnails'

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
          <div className="recomand-search">
            <h3>추천 검색어</h3>
            <div className="recomand-keyword">
              {recommendedKeywords.map((keyword) => (
                <RecommendedKeyword key={keyword} keyword={keyword} onClick={setSearchTag} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {playlists.length === 0 ? (
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
            ) : (
              <ul>
                {playlists.map((playlist) => (
                  <>
                    <PlaylistThumbnails playlistId={playlist.id} />
                    <li key={playlist.id}>
                      <Link to={`/playlist/${playlist.id}`}>
                        <h3>{playlist.title}</h3>
                      </Link>
                    </li>
                  </>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </Container>
  )
}

export default SearchPage

const Container = styled.div`
  padding: 30px 20px 0 20px;

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

  .search-result {
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
`
