import { auth, db } from '@/firebase/firebaseConfig'
import { doc, addDoc, getDocs, getDoc, collection } from 'firebase/firestore'

export interface videoListProps {
  title: string
  thumbnail: string
  url: string
  channelTitle: string
}

export const createPlayList = async (
  title: string,
  tags: string[],
  videoList: videoListProps[]
) => {
  try {
    const user = auth.currentUser

    if (user) {
      const uid = user.uid
      const userRef = doc(db, 'USERS', uid)
      const userDoc = await getDoc(userRef)
      const userName = userDoc.exists() ? userDoc.data().name : 'Unknown User'

      const playlistCollectionRef = collection(db, 'PLAYLISTS')
      const playlistsSnapshot = await getDocs(playlistCollectionRef)
      const playlistCount = playlistsSnapshot.size

      const playlistId = playlistCount + 1

      const newPlaylistRef = await addDoc(playlistCollectionRef, {
        playlistId: playlistId,
        title: title,
        tags: tags,
        createdAt: new Date(),
        author: `/USERS/${uid}`,
        authorName: userName,
      })

      const newPlaylistVideosRef = collection(newPlaylistRef, 'videos')
      for (const video of videoList) {
        await addDoc(newPlaylistVideosRef, {
          title: video.title,
          thumbnail: video.thumbnail,
          url: video.url,
          channelTitle: video.channelTitle,
        })
      }
    }
  } catch (error) {
    console.error('Error adding playlist: ', error)
  }
}
