import { useQuery } from '@tanstack/react-query'
import { PlaylistBaseProps } from '@/types/playlistType'
import getPlaylists from '@/service/playlist/getUserPlaylists'
import { getUIDFromUserId } from '@/utils/userDataUtils'

const fetchPlaylistData = async (userId?: string) => {
  if (!userId) return []
  const userData = await getUIDFromUserId(userId)
  const playlists = await getPlaylists(userData)

  return playlists.map((playlist) => ({
    playlistId: playlist.playlistId,
    title: playlist.title,
    thumbnail: playlist.thumbnails || 'not valid thumbnail',
    isPrivate: playlist.isPrivate,
    createdAt: playlist.createdAt,
  }))
}

export const usePlaylistData = (userId?: string) => {
  return useQuery<PlaylistBaseProps[], Error>({
    queryKey: ['playlists', userId],
    queryFn: () => fetchPlaylistData(userId),
    enabled: !!userId,
  })
}
