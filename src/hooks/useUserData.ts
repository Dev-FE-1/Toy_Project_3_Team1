import { useQuery } from '@tanstack/react-query'
import { userInfo } from '@/service/profile/profileInfo'
import NPProfile from '@/assets/np_logo.svg'

interface UserData {
  userName: string
  userId: string
  userImg: string
  userEmail: string
  userBio: string
  followerLength: number
  followingLength: number
  playlistLength: number
}

const fetchUserData = async (userId?: string): Promise<UserData> => {
  const data = await userInfo(userId)
  if (!data) {
    throw new Error('User not found')
  }
  return {
    userName: data.userName || '사용자',
    userId: data.userId || 'Unknown',
    userImg: data.userImg || NPProfile,
    userEmail: data.userEmail || 'Unknown',
    userBio: data.userBio || '안녕하세요.',
    followerLength: data.followerLength || 0,
    followingLength: data.followingLength || 0,
    playlistLength: data.playlistLength || 0,
  }
}

export const useUserData = (userId?: string) => {
  return useQuery<UserData, Error>({
    queryKey: ['userData', userId],
    queryFn: () => fetchUserData(userId),
    enabled: !!userId,
  })
}
