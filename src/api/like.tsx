import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getCountFromServer,
  collection,
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Heart } from 'lucide-react'

const LikeButton = ({ playlistId }: { playlistId: string }) => {
  const db = getFirestore()
  const auth = getAuth()
  const queryClient = useQueryClient()

  const likeDocRef = doc(db, `PLAYLISTS/${playlistId}/LIKERS/${auth.currentUser?.uid}`)
  const likersCollectionRef = collection(db, `PLAYLISTS/${playlistId}/LIKERS`)

  const { data: isLiked } = useQuery({
    queryKey: ['like', playlistId, auth.currentUser?.uid],
    queryFn: async () => {
      const docSnap = await getDoc(likeDocRef)
      return docSnap.exists()
    },
  })

  const { data: likeCount } = useQuery({
    queryKey: ['likeCount', playlistId],
    queryFn: async () => {
      const snapshot = await getCountFromServer(likersCollectionRef)
      return snapshot.data().count
    },
  })

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (isLiked) {
        await deleteDoc(likeDocRef)
      } else {
        await setDoc(likeDocRef, {
          userRef: doc(db, `users/${auth.currentUser?.uid}`),
          timestamp: new Date(),
        })
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['like', playlistId, auth.currentUser?.uid])
      queryClient.invalidateQueries(['likeCount', playlistId])
    },
  })

  const toggleLike = () => {
    likeMutation.mutate()
  }

  return (
    <>
      <Heart onClick={toggleLike} style={{ color: isLiked ? 'red' : 'initial' }} />
      <span>{likeCount} </span>
    </>
  )
}

export default LikeButton
