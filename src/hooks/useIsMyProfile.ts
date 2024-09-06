import { getUIDFromUserId } from '@/api/profile/profileInfo'
import { getLoggedInUserUID } from '@/utils/userDataUtils'
import { useState, useEffect } from 'react'

const useIsMyProfile = (userId?: string) => {
  const [isMyProfile, setIsMyProfile] = useState<boolean>(false)

  useEffect(() => {
    const fetchProfileData = async () => {
      const currentUser = await getLoggedInUserUID()
      if (userId) {
        const uidFromUserId = await getUIDFromUserId(userId)
        setIsMyProfile(uidFromUserId === currentUser)
      }
    }
    fetchProfileData()
  }, [userId])
  return isMyProfile
}

export default useIsMyProfile
