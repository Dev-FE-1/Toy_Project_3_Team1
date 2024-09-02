import { Heart } from 'lucide-react'
import { useLikeButton } from '@/api/playlist/likePlaylist'
import styled from '@emotion/styled'
import { colors } from '@/constants/color'

type StyledHeartProps = {
  isLiked: boolean
}
type StyledCountProps = {
  isLiked: boolean
}

const LikeButton = ({ playlistId }: { playlistId: string }) => {
  const { isLiked, likeCount, toggleLike } = useLikeButton(playlistId)

  return (
    <Container>
      <StyledHeart className="like-button" isLiked={isLiked} onClick={toggleLike} />
      <StyledCount isLiked={isLiked} className="like-count">
        {likeCount}
      </StyledCount>
    </Container>
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
    display: inline-block;
  }
`

const StyledHeart = styled(Heart, {
  shouldForwardProp: (prop) => prop !== 'isLiked',
})<StyledHeartProps>`
  color: ${(props) => (props.isLiked ? colors.red : colors.gray)};
`

const StyledCount = styled.div<StyledCountProps>`
  color: ${(props) => (props.isLiked ? colors.red : colors.gray)};
`
