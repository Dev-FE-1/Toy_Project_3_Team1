import { useState, useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import {
  getFirestore,
  doc,
  updateDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export const useLikeButton = (playlistId: string) => {
  const db = getFirestore()
  const auth = getAuth()

  const [likeData, setLikeData] = useState({ likers: [], likeCount: 0 })
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

  const isLiked = likeData.likers.includes(auth.currentUser?.uid)
  const likeCount = likeData.likeCount

  const likeMutation = useMutation({
    mutationFn: async () => {
      const userId = auth.currentUser?.uid
      await updateDoc(likeDocRef, {
        likers: isLiked ? arrayRemove(userId) : arrayUnion(userId),
      })
    },
  })

  const toggleLike = () => {
    if (auth.currentUser) {
      likeMutation.mutate()
    }
  }

  return {
    isLiked,
    likeCount,
    toggleLike,
  }
}
