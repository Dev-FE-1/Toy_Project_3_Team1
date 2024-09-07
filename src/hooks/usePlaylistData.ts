import { useEffect, useState } from 'react'
import { showplaylistProps } from '@/types/playlistType'
import getPlaylists from '@/service/playlist/getUserPlaylists'
import { getUIDFromUserId } from '@/utils/userDataUtils'

export const usePlaylistData = (userId?: string) => {
  const [playlistData, setPlayListData] = useState<showplaylistProps[]>([])

  useEffect(() => {
    const fetchPlayListData = async () => {
      try {
        const userData = await getUIDFromUserId(userId)
        const data = await getPlaylists(userData)
        if (data) {
          setPlayListData(data)
        }
      } catch (error) {
        console.error('Error fetching playlist data:', error)
      }
    }

    if (userId) {
      fetchPlayListData()
    }
  }, [userId])

  return playlistData
}
