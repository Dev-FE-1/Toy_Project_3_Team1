import { useState, useEffect } from 'react'
import { userInfo } from '@/api/profile/profileInfo'
import Profile from '@/assets/profile_logo.jpg'

export const useUserData = (userId?: string) => {
  const [userData, setUserData] = useState({
    userName: '',
    userId: '',
    userImg: '',
    userEmail: '',
    userBio: '',
    followerLength: 0,
    followingLength: 0,
    playlistLength: 0,
  })

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userInfo(userId)
      if (data) {
        setUserData({
          userName: data?.userName || '사용자',
          userId: data?.userId || 'Unknown',
          userImg: data?.userImg || Profile,
          userEmail: data?.userEmail || 'Unknown',
          userBio: data?.userBio || '안녕하세요.',
          followerLength: data?.followerLength || 0,
          followingLength: data?.followingLength || 0,
          playlistLength: data?.playlistLength || 0,
        })
      }
    }

    if (userId) {
      fetchUserData()
    }
  }, [userId])

  return userData
}
