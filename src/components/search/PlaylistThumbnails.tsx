import { useState, useEffect } from 'react'
import { ExtendedVideoProps } from '@/types/playlistType'
import styled from '@emotion/styled'
import getUserPlaylistDetails from '@/service/playlist/getUserPlaylistDetails'

const PlaylistThumbnails = ({ playlistId }: { playlistId: string }) => {
  const [videos, setVideos] = useState<ExtendedVideoProps[]>([])

  useEffect(() => {
    const fetchThumbnails = async () => {
      const fetchedVideos = await getUserPlaylistDetails(playlistId)
      setVideos(fetchedVideos)
    }
    fetchThumbnails()
  }, [playlistId])

  const thumbnails = videos.slice(0, 4)

  return (
    <Container count={thumbnails.length}>
      {thumbnails.map((video, idx) => (
        <img key={idx} src={video.thumbnail} alt={video.title} />
      ))}
    </Container>
  )
}

export default PlaylistThumbnails

const Container = styled.div<{ count: number }>`
  width: 100%;
  max-width: 180px;
  aspect-ratio: 1 / 1;
  display: grid;
  grid-template-columns: repeat(${(props) => Math.min(props.count, 2)}, 1fr);
  border-radius: 15px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
