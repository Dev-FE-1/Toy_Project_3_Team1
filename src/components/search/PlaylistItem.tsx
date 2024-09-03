import { Link } from 'react-router-dom'
import PlaylistThumbnails from '@/components/search/PlaylistThumbnails'
import { Playlist } from '@/api/playlist/searchTag'

const PlaylistItem = ({ playlist }: { playlist: Playlist }) => (
  <Link to={`/playlist/${playlist.id}`}>
    <div className="success-img">
      <PlaylistThumbnails playlistId={playlist.id} />
    </div>
    <li className="success-title" key={playlist.id}>
      <h4>{playlist.title}</h4>
    </li>
  </Link>
)

export default PlaylistItem
