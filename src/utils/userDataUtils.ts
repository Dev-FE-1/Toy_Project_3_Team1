import { getAuth } from 'firebase/auth'

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
