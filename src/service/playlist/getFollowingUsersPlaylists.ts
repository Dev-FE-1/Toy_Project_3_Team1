import { db, auth } from '@/firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import getUserPlaylists from '@/service/playlist/getUserPlaylists'

// 현재 로그인된 사용자가 팔로우한 사용자들의 플레이리스트를 가져오는 함수
const getFollowingUsersPlaylists = async () => {
  try {
    const currentUser = auth.currentUser
    if (!currentUser) {
      throw new Error('User is not logged in')
    }

    const uid = currentUser.uid

    const userRef = doc(db, 'USERS', uid)
    const userSnap = await getDoc(userRef)

    if (!userSnap.exists()) {
      console.error('User not found')
      return []
    }

    const userData = userSnap.data()
    const followingUserIds = userData.following || []

    const followingPlaylists = await Promise.all(
      followingUserIds.map(async (userId: string) => {
        const userPlaylists = await getUserPlaylists(userId)
        return { userId, playlists: userPlaylists }
      })
    )

    return followingPlaylists
  } catch (error) {
    console.error('Error fetching followed users playlists:', error)
    return []
  }
}

export default getFollowingUsersPlaylists
