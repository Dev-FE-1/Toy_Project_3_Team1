import { auth } from '@/firebase/firebaseConfig'
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'

const login = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserSessionPersistence)
    await signInWithEmailAndPassword(auth, email, password)

    return true
  } catch (error) {
    return false
  }
}

export default login
