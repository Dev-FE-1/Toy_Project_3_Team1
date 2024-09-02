import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { doc, onSnapshot, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore'
import { auth, db } from '@/firebase/firebaseConfig'

export const useLikeButton = (playlistId: string) => {
  const [likeData, setLikeData] = useState({ likers: [] as string[], likeCount: 0 })
  const likeDocRef = doc(db, `PLAYLISTS/${playlistId}`)

  useEffect(() => {
    const unsubscribe = onSnapshot(likeDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data()
        setLikeData({
          likers: data.likers || [],
          likeCount: data.likers?.length || 0,
        })
      } else {
        setLikeData({ likers: [], likeCount: 0 })
      }
    })

    return () => unsubscribe()
  }, [playlistId])

  const currentUserId = auth.currentUser?.uid
  const isLiked = currentUserId ? likeData.likers.includes(currentUserId) : false
  const { likeCount } = likeData

  const likeMutation = useMutation({
    mutationFn: async () => {
      const userId = auth.currentUser?.uid
      if (userId) {
        await updateDoc(likeDocRef, {
          likers: isLiked ? arrayRemove(userId) : arrayUnion(userId),
        })
      }
    },
  })

  const toggleLike = () => {
    if (auth.currentUser) {
      likeMutation.mutate()
    }
  }

  return { isLiked, likeCount, toggleLike }
}
