import { db } from '@/firebase/firebaseConfig'
import {
  getDoc,
  collection,
  query,
  getDocs,
  orderBy,
  DocumentData,
  Timestamp,
  limit,
  startAfter,
} from 'firebase/firestore'
import { CommentType } from '@/types/commentType'
import np_logo from '@/assets/np_logo.svg'

const userCache: Record<string, { name: string; img: string }> = {}

export const getComment = async (
  // TODO : Any ...
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pageParam: any
  // TODO : Any ...
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<{ comments: CommentType[]; nextCursor: any }> => {
  try {
    const pageSize = 5
    let q = query(
      collection(db, `PLAYLISTS/playlistId/COMMENTS`),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    )

    if (pageParam) {
      q = query(
        collection(db, `PLAYLISTS/playlistId/COMMENTS`),
        orderBy('createdAt', 'desc'),
        startAfter(pageParam),
        limit(pageSize)
      )
    }

    const snapshot = await getDocs(q)

    const commentsData = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const commentData = doc.data() as DocumentData

        let userImg = np_logo
        let userName = 'My Idoru'
        if (commentData.userRef) {
          const userRefPath = commentData.userRef.path
          if (userCache[userRefPath]) {
            userName = userCache[userRefPath].name
            userImg = userCache[userRefPath].img
          } else {
            try {
              const userDoc = await getDoc(commentData.userRef)
              const userData = userDoc.data() as { name?: string; img?: string } | undefined
              if (userData) {
                userName = userData.name || userName
                userImg = userData.img || userImg
                userCache[userRefPath] = { name: userName, img: userImg }
              }
            } catch (error) {
              console.error('Error fetching user data:', error)
            }
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

    const nextCursor = snapshot.docs[snapshot.docs.length - 1]

    return { comments: commentsData, nextCursor }
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw new Error('Failed to fetch comments')
  }
}
