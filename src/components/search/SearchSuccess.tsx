import { Playlist } from '@/api/playlist/searchTag'
import PlaylistItem from '@/components/search/PlaylistItem'
import { fontSize, fontWeight } from '@/constants/font'
import styled from '@emotion/styled'

const SearchSuccess = ({
  previousSearchTag,
  playlists,
}: {
  previousSearchTag: string
  playlists: Playlist[]
}) => (
  <Container>
    <h3 className="success-tag">검색 태그 : {previousSearchTag}</h3>
    <ul className="search-success">
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </ul>
  </Container>
)

export default SearchSuccess
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
`
