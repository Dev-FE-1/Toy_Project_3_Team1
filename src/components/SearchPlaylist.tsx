import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Playlist, SearchTag } from '@/api/playlist/searchTag'

const SearchPlaylist = () => {
  const [searchTag, setSearchTag] = useState('')
  const [playlists, setPlaylists] = useState<Playlist[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!searchTag.trim()) return

    const results = await SearchTag(searchTag)
    setPlaylists(results)
    setHasSearched(true)
    setSearchTag('')
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
          placeholder="검색어를 입력하세요."
        />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div>
        {!hasSearched ? (
          <p>어서오세요.</p>
        ) : (
          <>
            <div>검색 결과:</div>
            {playlists.length === 0 ? (
              <p>검색 결과가 없습니다.</p>
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
    </div>
  )
}

export default SearchPlaylist
