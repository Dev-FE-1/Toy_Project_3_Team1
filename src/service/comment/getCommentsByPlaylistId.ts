import { db } from '@/firebase/firebaseConfig'
import formatDate from '@/utils/formatDate'
import { collection, query, getDocs, getDoc, orderBy } from 'firebase/firestore'

interface User {
  id: string
  img: string
}

// 주어진 플레이리스트 ID에 대한 댓글 목록을 가져오는 함수
const getCommentsByPlaylistId = async (playlistId: string) => {
  try {
    const commentsRef = collection(db, `PLAYLISTS/${playlistId}/COMMENTS`)
    const q = query(commentsRef, orderBy('createdAt', 'desc'))

    const querySnapshot = await getDocs(q)

    const comments = await Promise.all(
      querySnapshot.docs.map(async (commentDoc) => {
        try {
          const data = commentDoc.data()

          const createdAt = data.createdAt ? formatDate(data.createdAt.toDate()) : 'Unknown'

          const userRef = data.userRef
          const userSnapshot = await getDoc(userRef)

          const userData = userSnapshot.exists()
            ? (userSnapshot.data() as User)
            : { id: 'Unknown', img: '' }

          return {
            id: commentDoc.id,
            comment: data.comment || 'No comment',
            createdAt: createdAt,
            userId: userData.id || 'Unknown user',
            userImg: userData.img || '',
          }
        } catch (error) {
          console.error(`Error fetching user data for comment ${commentDoc.id}:`, error)
          return {
            id: commentDoc.id,
            comment: 'No comment',
            createdAt: 'Unknown',
            userId: 'Unknown user',
            userImg: '',
          }
        }
      })
    )

    return comments
  } catch (error) {
    console.error('Error fetching comments:', error)
    return []
  }
}

export default getCommentsByPlaylistId
