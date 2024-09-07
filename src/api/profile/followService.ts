import { db } from '@/firebase/firebaseConfig'
import { getUIDFromUserId } from '@/utils/userDataUtils'
import { doc, updateDoc, arrayRemove, arrayUnion, onSnapshot } from 'firebase/firestore'

export const followUser = async (
  targetUserId: string,
  currentUID: string,
  isFollowing: boolean
) => {
  const targetUID = await getUIDFromUserId(targetUserId)
  const targetUserDocRef = doc(db, `USERS/${targetUID}`)
  const currentUserDocRef = doc(db, `USERS/${currentUID}`)

  const updates = [
    updateDoc(targetUserDocRef, {
      followers: isFollowing ? arrayRemove(currentUID) : arrayUnion(currentUID),
    }),

    updateDoc(currentUserDocRef, {
      following: isFollowing ? arrayRemove(targetUID) : arrayUnion(targetUID),
    }),
  ]
  await Promise.all(updates)
}

export const followStatus = async (
  targetUserId: string,
  currentUID: string,
  onUpdate: (data: { followers: string[]; following: string[] }, isFollowing: boolean) => void
) => {
  const targetUID = await getUIDFromUserId(targetUserId)
  const targetUserDocRef = doc(db, `USERS/${targetUID}`)

  const unsubscribe = onSnapshot(targetUserDocRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      const data = docSnapshot.data()
      onUpdate(
        {
          followers: data.followers || [],
          following: data.followings || [],
        },
        data.followers?.includes(currentUID) || false
      )
    }
  })

  return unsubscribe
}
