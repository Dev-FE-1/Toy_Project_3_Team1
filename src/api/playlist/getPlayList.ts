import { auth, db } from '@/firebase/firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'

export interface showplaylistProps {
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
        const videoQuery = query(videosRef)
        const videoSnapshot = await getDocs(videoQuery)

        let thumbnail: string | null = null
        if (!videoSnapshot.empty) {
          const videoDoc = videoSnapshot.docs[0].data()
          thumbnail = videoDoc.thumbnail || null
        }

        playlists.push({
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
