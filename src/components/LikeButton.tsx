import { Heart } from 'lucide-react'
import { useLikeButton } from '@/api/playlist/likePlaylist'
import styled from '@emotion/styled'

const LikeButton = ({ playlistId }: { playlistId: string }) => {
  const { isLiked, likeCount, toggleLike } = useLikeButton(playlistId)

  return (
    <>
      <Container>
        <Heart
          className="like-button"
          onClick={toggleLike}
          style={{ color: isLiked ? 'red' : 'initial' }}
        />
        <span className="like-count" style={{ color: isLiked ? 'red' : 'initial' }}>
          {likeCount}
        </span>
      </Container>
    </>
  )
}

export default LikeButton

const Container = styled.div`
  .like-button {
    cursor: pointer;
    &:active {
      transform: scale(1.2);
    }
  }
  .like-count {
    font-size: 0.8em;
  }
`
