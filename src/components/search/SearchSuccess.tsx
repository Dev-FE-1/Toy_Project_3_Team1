import { Playlist } from '@/api/playlist/searchTag'
import PlaylistItem from '@/components/search/PlaylistItem'

const SearchSuccess = ({
  previousSearchTag,
  playlists,
}: {
  previousSearchTag: string
  playlists: Playlist[]
}) => (
  <>
    <h3 className="success-tag">검색 태그 : {previousSearchTag}</h3>
    <ul className="search-success">
      {playlists.map((playlist) => (
        <PlaylistItem key={playlist.id} playlist={playlist} />
      ))}
    </ul>
  </>
)

export default SearchSuccess
