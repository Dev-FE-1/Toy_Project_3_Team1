import { db } from '@/firebase/firebaseConfig'
import {
  getDoc,
  collection,
  query,
  getDocs,
  orderBy,
  DocumentData,
  limit,
  Timestamp,
} from 'firebase/firestore'
import { CommentType } from '@/types/commentType'
import np_logo from '@/assets/np_logo.svg'

export const getComment = async (page: number, pageSize: number = 10): Promise<CommentType[]> => {
  try {
    const q = query(
      collection(db, `PLAYLISTS/playlistId/COMMENTS`),
      orderBy('createdAt', 'desc'),
      limit(page * pageSize)
    )

    const snapshot = await getDocs(q)

    const commentsData = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const commentData = doc.data() as DocumentData

        let userImg = np_logo
        let userName = 'My Idoru'

        if (commentData.userRef) {
          try {
            const userDoc = await getDoc(commentData.userRef)
            const userData = userDoc.data() as { name?: string; img?: string } | undefined
            if (userData) {
              userName = userData.name || userName
              userImg = userData.img || userImg
            }
          } catch (error) {
            console.error('Error fetching user data:', error)
          }
        }

        return {
          id: doc.id,
          comment: commentData.comment,
          createdAt: (commentData.createdAt as Timestamp).toMillis(),
          userRef: commentData.userRef.path,
          userName,
          userImg,
        }
      })
    )

    return commentsData
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw new Error('Failed to fetch comments')
  }
}
