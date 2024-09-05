import { useState } from 'react'
import { videoListProps } from '@/types/playlistType'

const usePLItem = () => {
  const [isValid, setIsValid] = useState(true)
  const [videoList, setVideoList] = useState<videoListProps[]>([])
  const [url, setUrl] = useState('')

  const handleAddList = async () => {
    const isValidYoutubeUrl = (url: string) => {
      const regex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/
      return regex.test(url)
    }

    if (!isValidYoutubeUrl(url)) {
      setIsValid(false)
      return
    }
    setIsValid(true)

    const youtubeKey = import.meta.env.VITE_YOUTUBE_API_KEY
    const videoId = url.split('v=')[1]?.split('&')[0]
    const videoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${youtubeKey}`

    try {
      const res = await fetch(videoUrl)
      const data = await res.json()

      if (data.items && data.items.length > 0) {
        const videoData = {
          title: data.items[0].snippet.title,
          channelTitle: data.items[0].snippet.channelTitle,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          thumbnail: data.items[0].snippet.thumbnails.medium.url,
        }
        setVideoList((prev: videoListProps[]) => [...prev, videoData])
        setUrl('')
      }
    } catch (error) {
      console.error('add list error :', error)
    }
  }

  const handleDelete = (id: number) => {
    setVideoList((prev: videoListProps[]) => prev.filter((_, index) => index !== id))
  }

  return {
    url,
    setVideoList,
    videoList,
    handleAddList,
    isValid,
    setUrl,
    handleDelete,
  }
}

export default usePLItem
