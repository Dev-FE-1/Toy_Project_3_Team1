import { db } from '@/firebase/firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'

export interface Playlist {
  thumbnails: string[]
  id: string
  title: string
  tags: string[]
}

export const SearchTag = async (tag: string): Promise<Playlist[]> => {
  const formattedTag = `${tag.trim()}`
  const playlistsRef = collection(db, 'PLAYLISTS')
  const q = query(
    playlistsRef,
    where('tags', 'array-contains', formattedTag),
    where('isPrivate', '==', false)
  )

  const querySnapshot = await getDocs(q)
  const results: Playlist[] = []
  querySnapshot.forEach((doc) => {
    const playlist = { id: doc.id, ...doc.data() } as Playlist
    results.push(playlist)
  })

  return results
}
