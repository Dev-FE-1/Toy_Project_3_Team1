import { auth, db } from '@/firebase/firebaseConfig'
import { collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore'
import { UserType } from '@/types/userType'

export interface ProfileProps extends UserType {
  follwer: FollowerProps[]
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

export const userInfo = async () => {
  try {
    const user = auth.currentUser

    if (user) {
      const uid = user.uid
      const userRef = doc(db, 'USERS', uid)
      const userDoc = await getDoc(userRef)

      if (!userDoc.exists()) {
        return
      }

      const userData = userDoc.data() as ProfileProps

      const [followerSnapShot, followingSnapShot, querySnapShot] = await Promise.all([
        getDocs(collection(userRef, 'Followers')),
        getDocs(collection(userRef, 'Followings')),
        getDocs(query(collection(db, 'PLAYLISTS'), where('author', '==', `/USERS/${uid}`))),
      ])

      const followerLength = followerSnapShot.size
      const followingLength = followingSnapShot.size
      const playlistLength = querySnapShot.size

      return {
        userName: userData.name,
        userId: userData.id,
        userEmail: userData.email,
        userBio: userData.bio,
        followerLength,
        followingLength,
        playlistLength,
      }
    }
  } catch (error) {
    console.error('userInfo fetch Error', error)
  }
}
