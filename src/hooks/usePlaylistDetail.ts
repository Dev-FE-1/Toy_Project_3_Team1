import { useEffect, useState } from 'react'
import { getPlayListDetails } from '@/api/playlist/getPlayList'
import { videoListProps } from '@/types/playlistType'

export const usePlaylistdetail = (playlistId: string | undefined) => {
  const [videos, setVideos] = useState<videoListProps[]>([])
  const [selectedVideo, setSelectedVideo] = useState<videoListProps>()
  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      if (playlistId) {
        const playlistDetails = await getPlayListDetails(playlistId)
        setVideos(playlistDetails)
        if (playlistDetails.length > 0) {
          setSelectedVideo(playlistDetails[0])
        }
      }
    }
    fetchPlaylistDetails()
  }, [playlistId])

  return { videos, selectedVideo, setSelectedVideo }
}
