import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'

const useUserId = (userId?: string) => {
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(userId)
  useEffect(() => {
    if (!userId) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUserId(user.uid)
        }
      })
      return () => unsubscribe()
    }
  }, [userId])

  return currentUserId
}

export default useUserId
