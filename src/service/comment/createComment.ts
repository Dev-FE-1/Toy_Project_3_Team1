import { db, auth } from '@/firebase/firebaseConfig'
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore'

// 댓글을 생성하는 함수
const createComment = async (playlistId: string, comment: string) => {
  try {
    const { currentUser } = auth
    if (!currentUser) {
      throw new Error('User not authenticated')
    }

    const userId = currentUser.uid

    const userRef = doc(db, `USERS/${userId}`)

    const commentRef = doc(collection(db, `PLAYLISTS/${playlistId}/COMMENTS`))

    await setDoc(commentRef, {
      comment: comment,
      createdAt: serverTimestamp(),
      userRef: userRef,
    })
  } catch (error) {
    console.error('Error creating comment:', error)
    throw new Error('Failed to create comment')
  }
}

export default createComment
