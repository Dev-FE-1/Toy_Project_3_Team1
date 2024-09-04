import { db, auth } from '@/firebase/firebaseConfig'
import { doc, deleteDoc } from 'firebase/firestore'

export const deleteComment = async (playlistId: string, commentId: string) => {
  const { currentUser } = auth
  if (!currentUser) throw new Error('Not yours!')

  const commentRef = doc(db, `PLAYLISTS/${playlistId}/COMMENTS`, commentId)
  await deleteDoc(commentRef)
}
