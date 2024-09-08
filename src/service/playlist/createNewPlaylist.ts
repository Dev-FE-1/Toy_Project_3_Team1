import { db } from '@/firebase/firebaseConfig'
import { BasicVideoProps } from '@/types/playlistType'
import { getLoggedInUserUID } from '@/utils/userDataUtils'
import { addDoc, collection, getDoc, doc } from 'firebase/firestore'

const createNewPlaylist = async (
  title: string,
  tags: string[],
  videoList: BasicVideoProps[],
  isPrivate: boolean
) => {
  try {
    const userId = await getLoggedInUserUID()

    if (userId) {
      const userRef = doc(db, 'USERS', userId)
      const userDoc = await getDoc(userRef)
      const userName = userDoc.exists() ? userDoc.data()?.name : 'Unknown User'

      const playlistTitle = title || 'Untitled'

      const playlistCollectionRef = collection(db, 'PLAYLISTS')
      const newPlaylistRef = await addDoc(playlistCollectionRef, {
        title: playlistTitle,
        tags: tags,
        createdAt: new Date(),
        author: `/${userRef.path}`,
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

      return {
        success: true,
        message: 'Playlist created successfully',
        playlistId: newPlaylistRef.id,
      }
    } else {
      return {
        success: false,
        message: 'User not authenticated',
      }
    }
  } catch (error) {
    console.error('Error adding playlist: ', error)
    return {
      success: false,
      message: 'Error creating playlist',
    }
  }
}

export default createNewPlaylist
