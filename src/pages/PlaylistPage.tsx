import styled from '@emotion/styled'
import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { colors } from '@/styles/colors'
import Button from '@/components/common/Button/Button'
import { usePlaylistdetail } from '@/hooks/usePlaylistDetail'
import Comments from '@/components/comments/Comments'
import NPProfile from '@/assets/np_logo.svg'
import Avatar from '@/components/common/Avatar'
import LikeButton from '@/components/common/Button/LikeButton'

const PlaylistPage = () => {
  const { playlistId } = useParams<{ playlistId: string }>()
  const [tab, setTab] = useState<'videos' | 'comments'>('videos')
  const { videos, selectedVideo, setSelectedVideo } = usePlaylistdetail(playlistId)

  const renderVideos = () => (
    <VideoList>
      {videos.map((video, idx) => (
        <div
          className={`video-item ${selectedVideo === video.playlistTitle ? 'active' : ''}`}
          key={idx}
          onClick={() => {
            setSelectedVideo(videos[idx])
          }}
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
  )

  const renderComments = () => (
    <CommentList>
      <Comments playlistId={playlistId ?? ''} />
    </CommentList>
  )

  return (
    <Container>
      <div className="video-player">
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
              <Link to={`/profile/${selectedVideo?.author}`}>
                <Avatar src={selectedVideo?.authorImg || NPProfile} />
              </Link>
              <div className="info-author-date">
                <Link to={`/profile/${selectedVideo?.author}`}>
                  <div className="info-author">{selectedVideo?.author}</div>
                </Link>
                <div className="info-date">{selectedVideo?.uploadDate}</div>
              </div>
            </div>
            <div className="info-likes">
              <LikeButton playlistId={playlistId || ''} />
            </div>
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="section-btn">
        <Button
          size="small"
          onClick={() => setTab('videos')}
          variant={tab === 'videos' ? 'outline' : 'primary'}
        >
          영상
        </Button>
        <Button
          size="small"
          onClick={() => setTab('comments')}
          variant={tab === 'comments' ? 'outline' : 'primary'}
        >
          댓글
        </Button>
      </div>
      {tab === 'videos' ? renderVideos() : renderComments()}
    </Container>
  )
}

export default PlaylistPage

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  .section-btn {
    display: flex;
    width: 150px;
    gap: 10px;
    padding: 0 20px;
  }

  .divider {
    background-color: ${colors.lightestGray};
    width: 100%;
    height: 6px;
  }

  .video-player {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 20px 10px;
    margin-top: 10px;

    iframe {
      max-width: 100%;
      border-radius: 12px;
      margin-bottom: 10px;
    }

    .info-video {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      .playlist-title {
        font-weight: bold;
        font-size: 18px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-word;
        -webkit-box-orient: vertical;
      }

      .info-details {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .info-left {
          display: flex;
          align-items: center;
          gap: 10px;

          a {
            text-decoration: none;
            display: flex;
          }
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
  }
`

const VideoList = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;

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
      background-color: ${colors.lightPurPle};
    }

    &:hover {
      background-color: ${colors.lightPurPle};
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

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;

  .comment-item {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
`
