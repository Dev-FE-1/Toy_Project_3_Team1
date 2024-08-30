import { auth, db } from '@/firebase/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { videoListProps } from './createPlayList'

export interface showplaylistProps {
  playlistId: string
  title: string
  thumbnail: string
}

export const getPlayList = async () => {
  try {
    const user = auth.currentUser
    if (user) {
      const uid = user.uid
      const playlistRef = collection(db, 'PLAYLISTS')
      const q = query(playlistRef, where('author', '==', `/USERS/${uid}`))
      const querySnapShot = await getDocs(q)
      const playlists: showplaylistProps[] = []

      for (const doc of querySnapShot.docs) {
        const playlistData = doc.data()
        const videosRef = collection(doc.ref, 'videos')
        const videoSnapshot = await getDocs(videosRef)

        let thumbnail: string | null = null
        if (!videoSnapshot.empty) {
          const videoDoc = videoSnapshot.docs[0].data()
          thumbnail = videoDoc.thumbnail || null
        }

        playlists.push({
          playlistId: doc.id,
          title: playlistData.title || 'Untitled',
          thumbnail: thumbnail || 'not valid thumbnail',
        })
      }

      return playlists
    }
  } catch (error) {
    console.error('getplaylist fetch Error', error)
  }
}

export const getPlayListDetails = async (playlistId: string) => {
  try {
    const videosRef = collection(db, `PLAYLISTS/${playlistId}/videos`)
    const videoSnapShot = await getDocs(videosRef)
    const videos: videoListProps[] = videoSnapShot.docs.map((item) => ({
      channelTitle: item.data().channelTitle,
      title: item.data().channelTitle,
      thumbnail: item.data().thumbnail,
      url: item.data().url,
    }))

    return videos
  } catch (error) {
    console.error('getPlayListDetails fetch Error', error)
    return []
  }
}
