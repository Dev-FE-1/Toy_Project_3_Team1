import { auth, db } from '@/firebase/firebaseConfig'
import { collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore'
import { UserType } from '@/types/userType'
import { getUIDFromUserId } from '@/utils/userDataUtils'

export interface ProfileProps extends UserType {
  followers: FollowerProps[]
  following: FollowingProps[]
}

export interface FollowerProps {
  userId: string
  img: string | null
}

export interface FollowingProps {
  userId: string
  img: string | null
}

export const userInfo = async (userId?: string) => {
  try {
    let uid = auth.currentUser?.uid

    if (userId && userId !== uid) {
      uid = await getUIDFromUserId(userId)
    }

    if (uid) {
      const userRef = doc(db, 'USERS', uid)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        return
      }

      const userData = userDoc.data() as ProfileProps
      const [querySnapShot] = await Promise.all([
        getDocs(query(collection(db, 'PLAYLISTS'), where('author', '==', `/USERS/${uid}`))),
      ])

      const playlistLength = querySnapShot.size
      const followers = userData.followers || []
      const followings = userData.following || []

      return {
        userName: userData.name,
        userId: userData.id,
        userImg: userData.img,
        userEmail: userData.email,
        userBio: userData.bio,
        followerLength: followers.length,
        followingLength: followings.length,
        playlistLength,
      }
    }
  } catch (error) {
    console.error('userInfo fetch Error', error)
  }
}
