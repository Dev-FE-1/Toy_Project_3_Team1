import { FIREBASE_SESSION_KEY } from '@/constants/firebaseKeys'

const checkAuth = (): boolean => {
  const sessionKey = FIREBASE_SESSION_KEY
  const isLogin = sessionStorage.getItem(sessionKey)

  return !!isLogin
}

export default checkAuth
