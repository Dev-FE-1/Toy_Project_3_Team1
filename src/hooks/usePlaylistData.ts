import { useEffect, useState } from 'react'
import { getPlayList } from '@/api/playlist/getPlayList'
import { showplaylistProps } from '@/types/playlistType'
import useUserId from './useUserId'

export const usePlaylistData = (userId?: string) => {
  const currentUser = useUserId(userId)
  const [playlistData, setPlayListData] = useState<showplaylistProps[]>([])

  useEffect(() => {
    const fetchPlayListData = async () => {
      const data = await getPlayList(currentUser)
      if (data) {
        setPlayListData(data)
      }
    }

    if (currentUser) {
      fetchPlayListData()
    }
  }, [currentUser])

  return playlistData
}
