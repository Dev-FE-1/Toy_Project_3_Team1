import { auth, db } from '@/firebase/firebaseConfig'
import { collection, getDocs, getDoc, query, where, doc } from 'firebase/firestore'
import { showplaylistProps, videoListProps } from '@/types/playlistType'
import formatDate from '@/utils/formatDate'

export const getPlayList = async (userId?: string) => {
  try {
    const uid = userId || auth.currentUser?.uid

    if (uid) {
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
          isPrivate: playlistData.isPrivate,
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
    const playlistInfoRef = doc(db, 'PLAYLISTS', `${playlistId}`)
    const InfoSnapShot = await getDoc(playlistInfoRef)

    const videosRef = collection(db, `PLAYLISTS/${playlistId}/videos`)
    const videoSnapShot = await getDocs(videosRef)

    if (!InfoSnapShot.exists()) {
      console.error('Playlist not found')
      return []
    }
    const playlistData = InfoSnapShot.data()

    const authorUID = playlistData?.author?.split('/').pop()

    const userDocRef = doc(db, 'USERS', authorUID)
    const userDoc = await getDoc(userDocRef)
    const userData = userDoc.data()

    const videos: videoListProps[] = videoSnapShot.docs.map((item) => ({
      channelTitle: item.data().channelTitle,
      title: item.data().title,
      thumbnail: item.data().thumbnail,
      url: item.data().url,
      author: userData?.id,
      authorImg: userData?.img,
      uploadDate: playlistData.createdAt ? formatDate(playlistData?.createdAt) : '',
      tags: playlistData.tags,
      playlistTitle: playlistData.title,
    }))

    return videos
  } catch (error) {
    console.error('getPlayListDetails fetch Error', error)
    return []
  }
}
