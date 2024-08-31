import { useState, useEffect } from 'react'
import { getFirestore, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Heart } from 'lucide-react'

const LikeButton = ({ playlistId }) => {
  const [isLiked, setIsLiked] = useState(false)
  const db = getFirestore()
  const auth = getAuth()

  useEffect(() => {
    checkLikeStatus()
  }, [playlistId])

  const checkLikeStatus = async () => {
    const likeDoc = doc(db, `PLAYLISTS/${playlistId}/LIKERS/${auth.currentUser?.uid}`)
    const docSnap = await getDoc(likeDoc)
    setIsLiked(docSnap.exists())
  }

  const toggleLike = async () => {
    const likeDoc = doc(db, `PLAYLISTS/${playlistId}/LIKERS/${auth.currentUser?.uid}`)

    try {
      if (isLiked) {
        await deleteDoc(likeDoc)
      } else {
        await setDoc(likeDoc, {
          userRef: doc(db, `users/${auth.currentUser?.uid}`),
          timestamp: new Date(),
        })
      }
      setIsLiked(!isLiked)
    } catch (error) {
      console.error('좋아요 토글 중 오류 발생:', error)
    }
  }

  return <Heart onClick={toggleLike} style={{ color: isLiked ? 'red' : 'initial' }} />
}

export default LikeButton
