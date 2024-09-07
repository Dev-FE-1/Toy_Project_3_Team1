import { useState } from 'react'
import { videoListProps } from '@/types/playlistType'

const usePLItem = () => {
  const [isValid, setIsValid] = useState(true)
  const [validType, setValidType] = useState('')
  const [videoList, setVideoList] = useState<videoListProps[]>([])
  const [url, setUrl] = useState('')

  const handleAddList = async () => {
    const isValidYoutubeUrl = (url: string): boolean => {
      const regex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/
      return regex.test(url)
    }

    const isUniqueUrl = (url: string): boolean => {
      if (videoList.length === 0) {
        return true
      }

      return !videoList.some((video) => video.url === url)
    }

    if (!isValidYoutubeUrl(url)) {
      setIsValid(false)
      setValidType('Youtube')
      return
    } else if (!isUniqueUrl(url)) {
      setIsValid(false)
      setValidType('Duplication')
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
    validType,
  }
}

export default usePLItem
