import { useEffect, useState } from 'react'
import { getPlayList } from '@/api/playlist/getPlayList'
import { showplaylistProps } from '@/types/playlistType'

export const usePlaylistData = () => {
  const [playlistData, setPlayListData] = useState<showplaylistProps[]>([])

  useEffect(() => {
    const fetchPlayListData = async () => {
      const data = await getPlayList()
      if (data) {
        setPlayListData(data)
      }
    }
    fetchPlayListData()
  }, [])

  return playlistData
}
