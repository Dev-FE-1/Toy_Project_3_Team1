import { useEffect, useState } from 'react'
import { ExtendedVideoProps } from '@/types/playlistType'
import getUserPlaylistDetails from '@/service/playlist/getUserPlaylistDetails'

export const usePlaylistdetail = (playlistId?: string) => {
  const [videos, setVideos] = useState<ExtendedVideoProps[]>([])
  const [selectedVideo, setSelectedVideo] = useState<ExtendedVideoProps>()
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
  }, [])

  return { videos, selectedVideo, setSelectedVideo }
}
