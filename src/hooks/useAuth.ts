import { auth } from '@/firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const useAuth = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        if (pathname === '/login') {
          navigate('/')
        }
      } else {
        setIsAuthenticated(false)
        if (!['/login', '/login/editpassword', '/login/signup'].includes(pathname)) {
          navigate('/login')
        }
      }
    })
    return () => unsubscribe()
  }, [pathname])

  return { isAuthenticated }
}

export default useAuth
