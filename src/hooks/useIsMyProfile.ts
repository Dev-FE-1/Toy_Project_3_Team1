import { useQuery } from '@tanstack/react-query'
import { getLoggedInUserUID, getUIDFromUserId } from '@/utils/userDataUtils'

const fetchProfileData = async (userId?: string) => {
  const currentUser = await getLoggedInUserUID()
  if (!userId) return false
  const uidFromUserId = await getUIDFromUserId(userId)
  return uidFromUserId === currentUser
}

export const useIsMyProfile = (userId?: string) => {
  return useQuery<boolean, Error>({
    queryKey: ['isMyProfile', userId],
    queryFn: () => fetchProfileData(userId),
    enabled: !!userId,
  })
}
