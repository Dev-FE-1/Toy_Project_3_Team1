import { db } from '@/firebase/firebaseConfig'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'
import formatDate from '@/utils/formatDate'

// 주어진 플레이리스트 ID에 대한 세부 정보를 가져오는 함수
const getUserPlaylistDetails = async (playlistId: string) => {
  try {
    const playlistInfoRef = doc(db, 'PLAYLISTS', playlistId)
    const infoSnapshot = await getDoc(playlistInfoRef)

    if (!infoSnapshot.exists()) {
      console.error('Playlist not found')
      return []
    }

    const playlistData = infoSnapshot.data()

    const authorUID = playlistData?.author?.split('/').pop()
    const userDocRef = doc(db, 'USERS', authorUID)
    const userDoc = await getDoc(userDocRef)
    const userData = userDoc.data()

    const videosRef = collection(db, `PLAYLISTS/${playlistId}/videos`)
    const videoSnapshot = await getDocs(videosRef)

    const videos = await Promise.all(
      videoSnapshot.docs.map(async (videoDoc) => {
        try {
          const videoData = videoDoc.data()
          return {
            channelTitle: videoData.channelTitle,
            title: videoData.title,
            thumbnail: videoData.thumbnail,
            url: videoData.url,
            author: userData?.id,
            authorImg: userData?.img,
            uploadDate: playlistData.createdAt ? formatDate(playlistData.createdAt) : '',
            tags: playlistData.tags,
            playlistTitle: playlistData.title,
          }
        } catch (error) {
          console.error(`Error fetching video data for ${videoDoc.id}:`, error)
          return {
            channelTitle: 'Unknown',
            title: 'Unknown Video',
            thumbnail: 'not valid thumbnail',
            url: '',
            author: userData?.id,
            authorImg: userData?.img,
            uploadDate: '',
            tags: [],
            playlistTitle: playlistData.title,
          }
        }
      })
    )

    return videos
  } catch (error) {
    console.error('Error fetching playlist details:', error)
    return []
  }
}

export default getUserPlaylistDetails
