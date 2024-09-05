import { useEffect, useState } from 'react'
import { videoListProps } from '@/types/playlistType'
import getUserPlaylistDetails from '@/service/playlist/getUserPlaylistDetails'

export const usePlaylistdetail = (playlistId?: string) => {
  const [videos, setVideos] = useState<videoListProps[]>([])
  const [selectedVideo, setSelectedVideo] = useState<videoListProps>()
  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      if (playlistId) {
        const playlistDetails = await getUserPlaylistDetails(playlistId)
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
