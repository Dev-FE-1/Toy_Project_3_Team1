import { FIREBASE_SESSION_KEY } from '@/constants/firebaseKeys'
import { auth } from '@/firebase/firebaseConfig'
import { signOut } from 'firebase/auth'

const logout = async () => {
  try {
    await signOut(auth)
    const sessionKey = FIREBASE_SESSION_KEY

    if (sessionStorage.getItem(sessionKey)) {
      sessionStorage.removeItem(sessionKey)
    }
    return true
  } catch (error) {
    return false
  }
}

export default logout
