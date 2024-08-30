import styled from '@emotion/styled'
import { getPlayListDetails } from '@/api/playlist/getPlayList'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { videoListProps } from '@/types/playlistType'

const PlaylistPage = () => {
  const { playlistId } = useParams<{ playlistId: string }>()
  const [videos, setVideos] = useState<videoListProps[]>([])
  const [selectedVideo, setSelectedVideo] = useState<videoListProps>()

  useEffect(() => {
    const fecthPlaylistDetails = async () => {
      if (playlistId) {
        const playlistDetails = await getPlayListDetails(playlistId)
        setVideos(playlistDetails)
        if (playlistDetails.length > 0) {
          setSelectedVideo(playlistDetails[0])
        }
      }
    }
    fecthPlaylistDetails()
  }, [playlistId])

  return (
    <Container>
      <VideoPlayer>
        {selectedVideo ? (
          <iframe
            width="560"
            height="200"
            src={`https://www.youtube.com/embed/${selectedVideo?.url.split('v=')[1]?.split('&')[0]}?autoplay=1`}
            title="Selected Video"
            allowFullScreen
          ></iframe>
        ) : (
          <div>Select video</div>
        )}
        <div className="info-video">
          <div className="playlist-title">{selectedVideo?.playlistTitle}</div>
          <div className="info-details">
            <div className="info-left">
              <img className="author-image" src={selectedVideo?.authorImg} alt="Uploader" />
              <div className="info-author-date">
                <div className="info-author">{selectedVideo?.author}</div>
                <div className="info-date">{selectedVideo?.uploadDate}</div>
              </div>
            </div>
            <div className="info-likes">❤️ 좋아요수</div>
          </div>
        </div>
      </VideoPlayer>
      <VideoList>
        {videos.map((video, idx) => (
          <div
            className={`video-item ${selectedVideo?.url === video.url ? 'active' : ''}`}
            key={idx}
            onClick={() => setSelectedVideo(video)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.url.split('v=')[1]?.split('&')[0]}/hqdefault.jpg`}
              alt={video.title}
              className="video-thumbnail"
            />
            <div className="video-title">{video.title}</div>
          </div>
        ))}
      </VideoList>
    </Container>
  )
}

export default PlaylistPage

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`
const VideoPlayer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  iframe {
    max-width: 100%;
    border-radius: 12px;
  }

  .info-video {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;

    .playlist-title {
      font-weight: bold;
      font-size: 18px;
    }

    .info-details {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .info-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .author-image {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        object-fit: cover;
      }

      .info-author-date {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .info-author {
        font-size: 14px;
        font-weight: bold;
      }

      .info-date {
        font-size: 12px;
        color: #666;
      }

      .info-likes {
        font-size: 14px;
        color: #888;
      }
    }
  }
`

const VideoList = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .video-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    cursor: pointer;
    background-color: #f9f9f9;

    &.active {
      background-color: #e0e0e0;
    }

    &:hover {
      background-color: #e6e6e6;
    }

    .video-thumbnail {
      width: 130px;
      height: 70px;
      object-fit: cover;
    }

    .video-title {
      flex: 1;
      font-size: 14px;
      line-height: 1.2;
    }
  }
`
