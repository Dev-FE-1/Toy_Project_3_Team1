import { db, auth } from '@/firebase/firebaseConfig'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'

export const addComment = async (comment: string) => {
  const { currentUser } = auth
  const userId = currentUser?.uid

  if (!userId) throw new Error('User not authenticated')

  if (comment.length > 400) throw new Error('400 자 이상은 입력 할 수 없습니다.')

  const commentId = uuidv4()
  const commentRef = doc(db, `PLAYLISTS/playlistId/COMMENTS`, commentId)
  const userRef = doc(db, `USERS/${userId}`)

  await setDoc(commentRef, {
    comment,
    createdAt: serverTimestamp(),
    userRef,
  })
}
