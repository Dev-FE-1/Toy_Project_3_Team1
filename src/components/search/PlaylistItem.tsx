import { Link } from 'react-router-dom'
import PlaylistThumbnails from '@/components/search/PlaylistThumbnails'
import { Playlist } from '@/api/playlist/searchTag'
import styled from '@emotion/styled'
import { fontSize, fontWeight } from '@/constants/font'

const PlaylistItem = ({ playlist }: { playlist: Playlist }) => (
  <Container>
    <Link to={`/playlist/${playlist.id}`}>
      <div className="success-img">
        <PlaylistThumbnails playlistId={playlist.id} />
      </div>
      <div className="success-title" key={playlist.id}>
        {playlist.title}
      </div>
    </Link>
  </Container>
)

export default PlaylistItem
const Container = styled.div`
  .success-tag {
    padding-top: 5%;
    font-size: ${fontSize.xl};
    font-weight: ${fontWeight.bold};
    text-align: center;
    margin-bottom: 20px;
  }
  .search-success {
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 10px;
  }
  .success-img {
    display: flex;
    justify-content: center;
  }
  .success-title {
    padding: 10px 5px;
    margin-bottom: 20px;
    width: 100%;
    height: 53px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-size: ${fontSize.md};
    font-weight: ${fontWeight.medium};
  }
`
