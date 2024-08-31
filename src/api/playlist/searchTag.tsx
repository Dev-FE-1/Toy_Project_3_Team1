import React, { useState } from 'react'
import { db } from '@/firebase/firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'

interface Playlist {
  id: string
  name: string
  tags: string[]
}

const PlaylistSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [playlists, setPlaylists] = useState<Playlist[]>([])

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    const playlistsRef = collection(db, 'playlists')
    const q = query(playlistsRef, where('tags', 'array-contains', searchTerm.toLowerCase()))

    try {
      const querySnapshot = await getDocs(q)
      const results: Playlist[] = []
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() } as Playlist)
      })
      setPlaylists(results)
    } catch (error) {
      console.error('Error searching playlists:', error)
    }
  }

  return (
    <div>
      <h1>플레이리스트 검색</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="태그를 입력하세요"
      />
      <button onClick={handleSearch}>검색</button>

      <div>
        <h2>검색 결과:</h2>
        {playlists.length === 0 ? (
          <p>검색 결과가 없습니다.</p>
        ) : (
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                <h3>{playlist.name}</h3>
                <p>태그: {playlist.tags.join(', ')}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PlaylistSearch
