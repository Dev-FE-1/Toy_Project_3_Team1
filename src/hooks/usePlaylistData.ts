import { useQuery } from '@tanstack/react-query'
import { showplaylistProps } from '@/types/playlistType'
import getPlaylists from '@/service/playlist/getUserPlaylists'
import { getUIDFromUserId } from '@/utils/userDataUtils'

const fetchPlaylistData = async (userId?: string) => {
  if (!userId) return []
  const userData = await getUIDFromUserId(userId)
  return getPlaylists(userData)
}

export const usePlaylistData = (userId?: string) => {
  return useQuery<showplaylistProps[], Error>({
    queryKey: ['playlists', userId],
    queryFn: () => fetchPlaylistData(userId),
    enabled: !!userId,
  })
}
