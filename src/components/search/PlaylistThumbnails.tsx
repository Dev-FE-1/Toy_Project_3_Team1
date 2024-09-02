import { useState, useEffect } from 'react'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/firebaseConfig'
import { videoListProps } from '@/types/playlistType'
import formatDate from '@/utils/formatDate'
import styled from '@emotion/styled'

const PlaylistThumbnails = ({ playlistId }: { playlistId: string }) => {
  const [videos, setVideos] = useState<videoListProps[]>([])

  useEffect(() => {
    const fetchPlaylistThumbnails = async () => {
      try {
        const playlistInfoRef = doc(db, 'PLAYLISTS', playlistId)
        const infoSnapshot = await getDoc(playlistInfoRef)

        if (!infoSnapshot.exists()) {
          console.error('Playlist not found')
          return
        }

        const playlistData = infoSnapshot.data()

        const videosRef = collection(db, `PLAYLISTS/${playlistId}/videos`)
        const videoSnapshot = await getDocs(videosRef)

        const authorUID = playlistData?.author?.split('/').pop()
        const userDocRef = doc(db, 'USERS', authorUID)
        const userDoc = await getDoc(userDocRef)
        const userData = userDoc.data()

        const videos: videoListProps[] = videoSnapshot.docs.map((item) => ({
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

        setVideos(videos)
      } catch (error) {
        console.error('getPlayListDetails fetch Error', error)
      }
    }

    fetchPlaylistThumbnails()
  }, [playlistId])

  return (
    <Container>
      <div>
        {videos.slice(0, 4).map((video, index) => (
          <li key={index}>
            <img src={video.thumbnail} alt={video.title} />
          </li>
        ))}
      </div>
    </Container>
  )
}

export default PlaylistThumbnails

const Container = styled.div`
  div {
    width: 200px;
    display: flex;
    flex-wrap: wrap;
  }
  img {
    width: 100px;
  }
`
