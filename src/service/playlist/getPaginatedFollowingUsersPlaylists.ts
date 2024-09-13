import { db, auth } from '@/firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import getUserPlaylists from '@/service/playlist/getUserPlaylists'
import { FollowedUserPlaylists } from '@/types/playlistType'

// 현재 로그인된 사용자가 팔로우한 사용자들의 플레이리스트를 페이징으로 가져오는 함수
const getPaginatedFollowingUsersPlaylists = async ({
  startIndex = 0,
  limit = 3,
}: {
  startIndex: number
  limit: number
}): Promise<FollowedUserPlaylists[]> => {
  return new Promise((resolve, reject) => {
    // auth 상태 변화를 감지하는 함수
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const uid = user.uid

          const userRef = doc(db, 'USERS', uid)
          const userSnap = await getDoc(userRef)

          if (!userSnap.exists()) {
            console.error('User not found')
            resolve([]) // 유저가 존재하지 않으면 빈 배열 반환
            return
          }

          const userData = userSnap.data()
          const followingUserIds = userData.following || []

          // 팔로우한 사용자들 중 페이징에 맞는 ID 추출
          const paginatedFollowingUserIds = followingUserIds.slice(startIndex, startIndex + limit)

          const followingPlaylists = await Promise.all(
            paginatedFollowingUserIds.map(async (userId: string) => {
              const userPlaylists = await getUserPlaylists(userId)
              return { userId, playlists: userPlaylists }
            })
          )

          resolve(followingPlaylists) // 플레이리스트 반환
        } catch (error) {
          console.error('Error fetching paginated followed users playlists:', error)
          reject(error)
        }
      } else {
        console.error('User is not logged in')
        reject(new Error('User is not logged in'))
      }
      unsubscribe() // 상태 변화 감지 중지
    })
  })
}

export default getPaginatedFollowingUsersPlaylists
