import { useEffect, useState } from 'react'
import { auth } from '@/firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { getPlayList } from '@/api/playlist/getPlayList'
import { showplaylistProps } from '@/types/playlistType'

export const usePlaylistData = (userId?: string) => {
  const [playlistData, setPlayListData] = useState<showplaylistProps[]>([])

  useEffect(() => {
    const fetchPlayListData = async () => {
      const data = await getPlayList(userId)
      if (data) {
        setPlayListData(data)
      }
    }

    if (userId) {
      fetchPlayListData()
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          fetchPlayListData()
        }
      })
      return () => unsubscribe()
    }
  }, [userId])

  return playlistData
}
