import {
  collection,
  query,
  getDocs,
  getDoc,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore'
import formatDate from '@/utils/formatDate'
import { db } from '@/firebase/firebaseConfig'

interface User {
  id: string
  img: string
  name: string
}

const getPaginatedCommentsByPlaylistId = async (
  playlistId: string,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null,
  pageSize: number = 5
) => {
  try {
    const commentsRef = collection(db, `PLAYLISTS/${playlistId}/COMMENTS`)

    let q = query(commentsRef, orderBy('createdAt', 'desc'), limit(pageSize))

    if (lastDoc) {
      q = query(commentsRef, orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(pageSize))
    }

    const querySnapshot = await getDocs(q)

    const comments = await Promise.all(
      querySnapshot.docs.map(async (commentDoc) => {
        const data = commentDoc.data()
        const createdAt = data.createdAt ? formatDate(data.createdAt.toDate()) : 'Unknown'

        const userRef = data.userRef
        const userSnapshot = await getDoc(userRef)
        const userData = userSnapshot.exists()
          ? (userSnapshot.data() as User)
          : { id: 'Unknown', img: '', name: 'Unknown user' }

        return {
          id: commentDoc.id,
          comment: data.comment || 'No comment',
          createdAt: createdAt,
          userId: userData.id || 'Unknown user',
          userImg: userData.img || '',
          userName: userData.name || 'Unknown user',
        }
      })
    )

    return { comments, lastDoc: querySnapshot.docs[querySnapshot.docs.length - 1] || null }
  } catch (error) {
    console.error('Error fetching comments:', error)
    return { comments: [], lastDoc: null }
  }
}

export default getPaginatedCommentsByPlaylistId
