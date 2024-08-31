import React, { useState, useEffect } from 'react'
import { db } from '@/firebase/firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'

interface Playlist {
  id: string
  name: string
  tags: string[]
}

const PlaylistSearch: React.FC = () => {
  const [searchTag, setSearchTag] = useState('')
  const [playlists, setPlaylists] = useState<Playlist[]>([])

  useEffect(() => {
    const fetchAllPlaylists = async () => {
      const playlistsRef = collection(db, 'PLAYLISTS')
      const snapshot = await getDocs(playlistsRef)
      const allPlaylists = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Playlist)
      console.log('모든 플레이리스트:', allPlaylists)
    }
    fetchAllPlaylists()
  }, [])

  const handleSearch = async () => {
    if (!searchTag.trim()) return

    const formattedTag = formatTag(searchTag)
    const playlistsRef = collection(db, 'PLAYLISTS')
    console.log('검색 태그:', formattedTag)

    const q = query(playlistsRef, where('tags', 'array-contains', formattedTag))

    try {
      const querySnapshot = await getDocs(q)
      const results: Playlist[] = []
      querySnapshot.forEach((doc) => {
        const playlist = { id: doc.id, ...doc.data() } as Playlist
        console.log('찾은 플레이리스트:', playlist)
        results.push(playlist)
      })
      setPlaylists(results)
      console.log('검색 결과:', results)
    } catch (error) {
      console.error('플레이리스트 검색 중 오류 발생:', error)
    }
  }

  const formatTag = (tag: string): string => {
    // 앞뒤 공백을 제거하고 '#'을 추가
    return `#${tag.trim()}`
  }

  return (
    <div>
      <h1>플레이리스트 검색</h1>
      <input
        type="text"
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
        placeholder="태그를 입력하세요 (예: 힙합)"
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
