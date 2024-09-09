import styled from '@emotion/styled'
import { BasicVideoProps, PlaylistBaseProps } from '@/types/playlistType'
import { Trash2 } from 'lucide-react'
import { colors } from '@/constants/color'
import { fontSize } from '@/constants/font'
import { Link } from 'react-router-dom'
import ImageGrid from '@/components/common/ImageGrid'

interface MusicItemProps {
  videoList: BasicVideoProps[] | PlaylistBaseProps[]
  onItemDelete?: (id: number) => void | ''
  variant: 'profilePL' | 'createPL'
}

const isVideoListProps = (item: PlaylistBaseProps | BasicVideoProps): item is BasicVideoProps => {
  return 'channelTitle' in item
}

const MusicItem = ({ videoList, onItemDelete, variant }: MusicItemProps) => {
  return (
    <Container variant={variant}>
      {videoList.map((item, idx) => {
        const thumbnails = Array.isArray(item.thumbnail) ? item.thumbnail : [item.thumbnail]

        return (
          <div key={idx} className="item-video">
            {variant === 'profilePL' && 'playlistId' in item ? (
              <Link to={`/playlist/${item.playlistId}`} className="thumbnail-list">
                <div className="thumbnail">
                  <ImageGrid thumbnails={thumbnails} size="small" />
                </div>
                <div className="text-content">
                  <p>{item.title}</p>
                  {item.isPrivate && <div className="tag-private">비공개</div>}
                </div>
              </Link>
            ) : (
              <>
                <div className="content-container">
                  <div className="thumbnail-img">
                    <ImageGrid thumbnails={thumbnails} />
                  </div>
                  <div className="text-content">
                    <p>{item.title}</p>
                    {isVideoListProps(item) && <span>{item.channelTitle}</span>}
                  </div>
                </div>
                <button
                  className="btn-delete"
                  type="button"
                  onClick={() => {
                    if (onItemDelete) {
                      onItemDelete(idx)
                    }
                  }}
                >
                  <Trash2 color={colors.lightGray} />
                </button>
              </>
            )}
          </div>
        )
      })}
    </Container>
  )
}

export default MusicItem

export const Container = styled.div<{ variant: 'profilePL' | 'createPL'; isPrivate?: boolean }>`
  .item-video {
    display: flex;
    align-items: center;
    padding: ${(props) => (props.variant === 'createPL' ? '10px' : '5px 0')};
    border-radius: ${(props) => (props.variant === 'createPL' ? '5px' : '0')};
    background-color: ${(props) => (props.variant === 'createPL' ? colors.white : 'transparent')};
    justify-content: space-between;

    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: inherit;
      width: 100%;
    }

    &:hover {
      background-color: ${(props) =>
        props.variant === 'profilePL' ? colors.brightGray : colors.white};
    }
  }

  .content-container {
    display: flex;
  }

  .thumbnail-list {
    padding: 5px 20px;
  }

  .thumbnail {
    max-width: ${(props) => (props.variant === 'profilePL' ? '60px' : '0')};
    max-height: ${(props) => (props.variant === 'profilePL' ? '60px' : '0')};
    display: ${(props) => (props.variant === 'profilePL' ? 'flex' : 'none')};
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }

  .item-video img {
    width: ${(props) => (props.variant === 'createPL' ? '120px' : 'transparent')};
    height: ${(props) => (props.variant === 'createPL' ? '90px' : 'transparent')};
    object-fit: cover;
    margin-right: ${(props) => (props.variant === 'createPL' ? '14px' : '10px')};
    display: block;
  }

  .thumbnail-img {
    margin-right: 16px;
  }

  .video-thumbnail {
    width: 100px;
  }

  .text-content {
    display: flex;
    flex-direction: column;
    width: ${(props) => (props.variant === 'createPL' ? '210px' : '100%')};
    margin-right: 14px;
    line-height: 20px;

    @media (max-width: 390px) {
      width: ${(props) => (props.variant === 'profilePL' ? '280px' : 'auto')};
    }

    .tag-private {
      background-color: ${colors.lightPurPle};
      color: ${colors.primaryPurple};
      font-size: ${fontSize.sm};
      width: 54px;
      border-radius: 15px;
      text-align: center;
    }
  }

  .text-content p {
    font-size: ${fontSize.md};
    font-weight: bold;
    -webkit-line-clamp: ${({ isPrivate }) => (isPrivate ? '1' : '2')};
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    margin: 0;
    color: ${colors.black};
  }

  .text-content span {
    font-size: ${fontSize.sm};
    color: ${colors.gray};
    margin-top: 4px;
  }

  .btn-delete {
    width: ${(props) => (props.variant === 'createPL' ? '38px' : '24px')};
    height: ${(props) => (props.variant === 'createPL' ? '37px' : '24px')};
    border: 1px solid ${colors.lightestGray};
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
    display: ${(props) => (props.variant === 'createPL' ? 'block' : 'none')};
  }
`
