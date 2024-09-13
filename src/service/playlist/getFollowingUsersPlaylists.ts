import { auth, db } from '@/firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import getUserPlaylists from '@/service/playlist/getUserPlaylists'
import { FollowedUserPlaylists } from '@/types/playlistType'

// 현재 로그인된 사용자가 팔로우한 사용자들의 플레이리스트를 한 번에 모두 가져오는 함수
const getFollowingUsersPlaylists = async (): Promise<FollowedUserPlaylists[]> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const uid = user.uid
          const userRef = doc(db, 'USERS', uid)
          const userSnap = await getDoc(userRef)

          if (!userSnap.exists()) {
            console.error('User not found')
            resolve([])
            return
          }

          const userData = userSnap.data()
          const followingUserIds = userData.following || []

          const followingPlaylists: FollowedUserPlaylists[] = await Promise.all(
            followingUserIds.map(async (userId: string) => {
              const userPlaylists = await getUserPlaylists(userId)
              return { userId, playlists: userPlaylists }
            })
          )

          resolve(followingPlaylists)
        } catch (error) {
          console.error('Error fetching followed users playlists:', error)
          reject(error)
        }
      } else {
        console.error('User is not logged in')
        reject(new Error('User is not logged in'))
      }
      unsubscribe()
    })
  })
}

export default getFollowingUsersPlaylists
