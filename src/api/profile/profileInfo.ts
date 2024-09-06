import { auth, db } from '@/firebase/firebaseConfig'
import { collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore'
import { UserType } from '@/types/userType'

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

export const getUIDFromUserId = async (userId?: string) => {
  const userQuery = query(collection(db, 'USERS'), where('id', '==', userId))
  const querySnapshot = await getDocs(userQuery)

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].id
  }
  throw new Error('User not found')
}

export const getUserIdFromUID = async (uid: string) => {
  const userRef = doc(db, 'USERS', uid)
  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) {
    throw new Error('User document not found')
  }
  const userData = userDoc.data()
  return userData?.id
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
