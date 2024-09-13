import { FIREBASE_SESSION_KEY } from '@/constants/firebaseKeys'
import { auth, db } from '@/firebase/firebaseConfig'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

const googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    const user = result.user
    const userId = user.email?.split('@')[0]
    const userName = user.displayName
    const userEmail = user.email

    const userProfileRef = doc(db, `USERS/${user.uid}`)

    const docSnapshot = await getDoc(userProfileRef)
    if (!docSnapshot.exists()) {
      await setDoc(userProfileRef, {
        id: userId,
        name: userName,
        email: userEmail,
        bio: '',
        followers: 0,
        following: 0,
        img: '',
        createdAt: new Date(),
      })
    }

    sessionStorage.setItem(FIREBASE_SESSION_KEY, JSON.stringify(user))

    return true
  } catch (error) {
    return false
  }
}

export default googleLogin
