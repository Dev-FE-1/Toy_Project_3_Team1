import { auth, db } from '@/firebase/firebaseConfig'
import { doc, addDoc, getDoc, collection } from 'firebase/firestore'
import { videoListProps } from '@/types/playlistType'

export const createPlayList = async (
  title: string,
  tags: string[],
  videoList: videoListProps[],
  isPrivate: boolean
) => {
  try {
    const user = auth.currentUser

    if (user) {
      const uid = user.uid
      const userRef = doc(db, 'USERS', uid)
      const userDoc = await getDoc(userRef)
      const userName = userDoc.exists() ? userDoc.data().name : 'Unknown User'

      const playlistCollectionRef = collection(db, 'PLAYLISTS')

      const newPlaylistRef = await addDoc(playlistCollectionRef, {
        title: title,
        tags: tags,
        createdAt: new Date(),
        author: `/USERS/${uid}`,
        authorName: userName,
        isPrivate: isPrivate,
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
