import styled from '@emotion/styled'
import { videoListProps } from '@/types/playlistType'
import { Trash2 } from 'lucide-react'
import { colors } from '@/constants/color'
import { fontSize } from '@/constants/font'

interface MusicItemProps {
  videoList: videoListProps[]
  onItemDelete: (id: number) => void
}

const MusicItem = ({ videoList, onItemDelete }: MusicItemProps) => {
  return (
    <Container>
      {videoList.map((item, idx) => (
        <div key={idx} className="item-video">
          <img src={item.thumbnail} alt={`${item.title}`} />
          <div>
            <p>{item.title}</p>
            <span>{item.channelTitle}</span>
          </div>
          <button className="btn-delete" type="button" onClick={() => onItemDelete(idx)}>
            <Trash2 color={colors.lightGray} />
          </button>
        </div>
      ))}
    </Container>
  )
}

export default MusicItem

export const Container = styled.div`
  .item-video {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    background-color: ${colors.white};
  }

  .item-video img {
    width: 120px;
    height: 90px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 14px;
  }

  .item-video div {
    display: flex;
    flex-direction: column;
    width: 210px;
    margin-right: 14px;
  }

  .item-video p {
    font-size: ${fontSize.md};
    font-weight: bold;
    margin: 0;
    color: ${colors.black};
  }

  .item-video span {
    font-size: ${fontSize.sm};
    color: ${colors.gray};
    margin-top: 4px;
  }
`
