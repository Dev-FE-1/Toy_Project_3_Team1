import { db } from '@/firebase/firebaseConfig'
import { getUserRef } from '@/utils/userDataUtils'
import { collection, query, where, getDocs, doc as firestoreDoc, getDoc } from 'firebase/firestore'
import formatDate from '@/utils/formatDate'
import defaultThumbnail from '@/assets/default-thumbnail.png'

// 특정 사용자 또는 로그인한 사용자의 플레이리스트를 가져오는 함수
const getUserPlaylists = async (userId?: string) => {
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
      playlistQuerySnapshot.docs.map(async (playlistDoc) => {
        try {
          const playlistData = playlistDoc.data()

          const authorRef = firestoreDoc(db, 'USERS', playlistData.author.split('/')[2])
          const authorSnapshot = await getDoc(authorRef)

          const authorData = authorSnapshot.exists()
            ? (authorSnapshot.data() as { img: string })
            : { img: defaultThumbnail }

          const videosRef = collection(playlistDoc.ref, 'videos')
          const videoSnapshot = await getDocs(videosRef)

          const thumbnails = videoSnapshot.docs.slice(0, 4).map((videoDoc) => {
            return videoDoc.data().thumbnail || 'not valid thumbnail'
          })

          const createdAt = playlistData.createdAt ? formatDate(playlistData.createdAt) : 'Unknown'

          return {
            playlistId: playlistDoc.id,
            title: playlistData.title || 'Untitled',
            thumbnails: thumbnails,
            isPrivate: playlistData.isPrivate || false,
            createdAt: createdAt,
            author: playlistData.author || 'Unknown',
            authorName: playlistData.authorName || 'Unknown',
            authorImg: authorData.img || 'default-image-url',
            likers: playlistData.likers || [],
            tags: playlistData.tags || [],
          }
        } catch (error) {
          console.error(`Error fetching videos for playlist ${playlistDoc.id}:`, error)
          return null
        }
      })
    )

    return playlistsArray.filter((playlist) => playlist !== null)
  } catch (error) {
    console.error(`Error fetching playlists for user ${userId || 'logged-in user'}:`, error)
    return []
  }
}

export default getUserPlaylists
