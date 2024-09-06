import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { followUser, followStatus } from '@/api/profile/followService'

export const useFollowButton = (targetUserId: string, currentUID: string) => {
  const [followData, setfollowData] = useState({
    followers: [] as string[],
    following: [] as string[],
  })
  const [isFollowing, setIsFollowing] = useState<boolean>(false)

  const followMutation = useMutation({
    mutationFn: async () => {
      await followUser(targetUserId, currentUID, isFollowing)
    },
    onMutate: async () => {
      setIsFollowing((prev) => prev)
    },
  })

  const toggleFollow = async () => {
    await followMutation.mutateAsync()
  }

  useEffect(() => {
    let unsubscribe: (() => void) | undefined
    const fetchFollowStatus = async () => {
      if (currentUID && targetUserId) {
        unsubscribe = await followStatus(targetUserId, currentUID, (data, isFollowing) => {
          setfollowData(data)
          setIsFollowing(isFollowing)
        })
      }
    }
    fetchFollowStatus()
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [currentUID, targetUserId])

  const followerCount = followData.followers.length
  const followingCount = followData.following.length

  return { followData, isFollowing, toggleFollow, followerCount, followingCount }
}
