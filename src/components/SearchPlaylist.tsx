import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Playlist, SearchTag } from '@/api/playlist/searchTag'
import styled from '@emotion/styled'

const SearchPlaylist = () => {
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

  return (
    <Container>
      <div>
        <input
          type="text"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          placeholder="플레이리스트 관련 태그 검색"
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div>
        {!hasSearched ? (
          <div>
            <div>추천 검색어</div>
            <div className="recomand-search">
              <p onClick={() => setSearchTag('뉴진스')}>뉴진스</p>
              <p onClick={() => setSearchTag('힙합')}>힙합</p>
              <p onClick={() => setSearchTag('클래식')}>클래식</p>
              <p onClick={() => setSearchTag('재즈')}>재즈</p>
              <p onClick={() => setSearchTag('팝')}>팝</p>
              <p onClick={() => setSearchTag('락')}>락</p>
            </div>
          </div>
        ) : (
          <>
            <div>검색 결과:</div>
            {playlists.length === 0 ? (
              `죄송합니다.  ${previousSearchTag} 에 해당하는 플레이리스트를 찾을 수 없습니다.`
            ) : (
              <ul>
                {playlists.map((playlist) => (
                  <li key={playlist.id}>
                    <Link to={`/playlist/${playlist.id}`}>
                      <h3>{playlist.title}</h3>
                    </Link>
                    <div>{playlist.tags.join(' ')}</div>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </Container>
  )
}

export default SearchPlaylist

const Container = styled.div`
  root. {
    display: flex;
  }
  .recomand-search {
    display: flex;
  }
  p {
    cursor: pointer;
    margin-right: 10px;
  }
`
