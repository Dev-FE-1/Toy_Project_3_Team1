import { Heart } from 'lucide-react'
import { useLikeButton } from '@/api/playlist/likePlaylist'
import styled from '@emotion/styled'

const LikeButton = ({ playlistId }: { playlistId: string }) => {
  const { isLiked, likeCount, toggleLike } = useLikeButton(playlistId)

  return (
    <>
      <Container>
        <StyledHeart className="like-button" onClick={toggleLike} isLiked={isLiked} />
        <StyledCount className="like-count" isLiked={isLiked}>
          {likeCount}
        </StyledCount>
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

const StyledHeart = styled(Heart)`
  color: ${(props) => (props.isLiked ? 'red' : 'initial')};
`
const StyledCount = styled.div`
  color: ${(props) => (props.isLiked ? 'red' : 'initial')};
  display: inline-block;
`
