import { db } from '@/firebase/firebaseConfig'
import { getAuth } from 'firebase/auth'
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'

// 주어진 UID에 해당하는 사용자의 userId를 반환하는 함수
export const getUserIdFromUID = async (uid: string) => {
  const userRef = doc(db, 'USERS', uid)
  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) {
    throw new Error('User document not found')
  }
  const userData = userDoc.data()
  return userData?.id
}

// 주어진 userId에 해당하는 사용자의 UID를 반환하는 함수
export const getUIDFromUserId = async (userId?: string) => {
  const userQuery = query(collection(db, 'USERS'), where('id', '==', userId))
  const querySnapshot = await getDocs(userQuery)

  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].id
  }
  throw new Error('User not found')
}

// 현재 로그인된 사용자의 UID(고유 식별자)를 반환하는 함수
export const getLoggedInUserUID = (): string => {
  const auth = getAuth()
  const user = auth.currentUser

  if (user) {
    return user.uid
  } else {
    return ''
  }
}

// 현재 로그인된 사용자의 Firestore 참조 경로를 반환하는 함수
export const getUserRef = (): string => {
  const uid = getLoggedInUserUID()

  if (uid) {
    return `/USERS/${uid}`
  } else {
    throw new Error('No logged in user')
  }
}
