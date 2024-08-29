import { auth, db } from '@/firebase/firebaseConfig'
import { collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore'

export interface UserProps {
  name: string
  img: string | null
  bio: string | null
  email: string
  id: string
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
      const userName = userDoc.exists() ? userDoc.data().name : 'Unknown User'
      const userId = userDoc.exists() ? userDoc.data().id : 'Unknown User'
      const userEmail = userDoc.exists() ? userDoc.data().email : 'Unknown User'
      const userBio = userDoc.exists() ? userDoc.data().bio : 'Unknown User'

      const userFollower = collection(userRef, 'Followers')
      const followerSnapShot = await getDocs(userFollower)
      const followerLength = followerSnapShot.size

      const userFollowing = collection(userRef, 'Followings')
      const followingSnapShot = await getDocs(userFollowing)
      const followingLength = followingSnapShot.size

      const playlistRef = collection(db, 'PLAYLISTS')
      const q = query(playlistRef, where('author', '==', `/USERS/${uid}`))
      const querySnapShot = await getDocs(q)
      const playlistLength = querySnapShot.size

      return {
        userName,
        userId,
        userEmail,
        userBio,
        followerLength,
        followingLength,
        playlistLength,
      }
    }
  } catch (error) {
    console.error('userInfo fetch Error', error)
  }
}
