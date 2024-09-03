import { useState, useEffect } from 'react'
import { db } from '@/firebase/firebaseConfig'
import { getUIDFromUserId } from '@/api/profile/profileInfo'
import { doc, onSnapshot, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'
import { useMutation } from '@tanstack/react-query'

export const useFollowButton = (targetUserId: string, currentUID: string) => {
  const [followData, setfollowData] = useState({
    followers: [],
    following: [],
  })
  const [isFollowing, setIsFollowing] = useState<boolean>(false)
  const followerCount = followData.followers.length
  const followingCount = followData.following.length

  const followMutation = useMutation({
    mutationFn: async () => {
      if (currentUID) {
        const targetUID = await getUIDFromUserId(targetUserId)
        const targetUserDocRef = doc(db, `USERS/${targetUID}`)
        const currentUserDocRef = doc(db, `USERS/${currentUID}`)

        const updates = [
          updateDoc(targetUserDocRef, {
            followers: isFollowing ? arrayRemove(currentUID) : arrayUnion(currentUID),
          }),

          updateDoc(currentUserDocRef, {
            following: isFollowing ? arrayRemove(targetUID) : arrayUnion(targetUID),
          }),
        ]
        await Promise.all(updates)
      }
    },
    onMutate: async () => {
      setIsFollowing((prev) => prev)
    },
  })

  const toggleFollow = async () => {
    followMutation.mutateAsync()
  }

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const targetUId = await getUIDFromUserId(targetUserId)
      const targetUserDocRef = doc(db, `USERS/${targetUId}`)

      const unsubscribe = onSnapshot(targetUserDocRef, (docsnapshot) => {
        if (docsnapshot.exists()) {
          const data = docsnapshot.data()
          setfollowData({
            followers: data.followers || [],
            following: data.followings || [],
          })
          setIsFollowing(data.followers?.includes(currentUID) || false)
        }
      })
      return () => unsubscribe()
    }
    if (currentUID && targetUserId) {
      fetchFollowStatus()
    }
  }, [currentUID, targetUserId])

  return { followData, isFollowing, toggleFollow, followerCount, followingCount }
}
