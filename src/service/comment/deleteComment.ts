import { db } from '@/firebase/firebaseConfig'
import { doc, deleteDoc } from 'firebase/firestore'

// 특정 플레이리스트의 댓글을 삭제하는 함수
const deleteComment = async (playlistId: string, commentId: string) => {
  try {
    const commentRef = doc(db, `PLAYLISTS/${playlistId}/COMMENTS`, commentId)

    await deleteDoc(commentRef)
  } catch (error) {
    console.error('Error deleting comment:', error)
    throw new Error('Failed to delete comment')
  }
}

export default deleteComment
