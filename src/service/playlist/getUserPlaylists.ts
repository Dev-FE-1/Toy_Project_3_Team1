import { db } from '@/firebase/firebaseConfig'
import { getUserRef } from '@/utils/userDataUtils'
import { collection, query, where, getDocs } from 'firebase/firestore'
import formatDate from '@/utils/formatDate'

// 특정 사용자 또는 로그인한 사용자의 플레이리스트을 가져오는 함수
const getPlaylists = async (userId?: string) => {
  try {
    let userRef
    if (userId) {
      userRef = `/USERS/${userId}`
    } else {
      userRef = await getUserRef()
    }

    const playlistQuery = query(collection(db, 'PLAYLISTS'), where('author', '==', userRef))
    const playlistQuerySnapshot = await getDocs(playlistQuery)

    const playlistsArray = await Promise.all(
      playlistQuerySnapshot.docs.map(async (doc) => {
        try {
          const playlistData = doc.data()

          const videosRef = collection(doc.ref, 'videos')
          const videoSnapshot = await getDocs(videosRef)

          const thumbnail = !videoSnapshot.empty
            ? videoSnapshot.docs[0]?.data().thumbnail
            : 'not valid thumbnail'

          const createdAt = playlistData.createdAt ? formatDate(playlistData.createdAt) : 'Unknown'

          return {
            playlistId: doc.id,
            title: playlistData.title || 'Untitled',
            thumbnail: thumbnail,
            isPrivate: playlistData.isPrivate,
            createdAt: createdAt,
          }
        } catch (error) {
          console.error(`Error fetching videos for playlist ${doc.id}:`, error)
          return {
            playlistId: doc.id,
            title: 'Untitled',
            thumbnail: 'not valid thumbnail',
            isPrivate: false,
            createdAt: 'Unknown',
          }
        }
      })
    )

    return playlistsArray
  } catch (error) {
    console.error(`Error fetching playlists for user ${userId || 'logged-in user'}:`, error)
    return []
  }
}

export default getPlaylists
