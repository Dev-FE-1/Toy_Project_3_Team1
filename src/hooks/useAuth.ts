import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const useAuth = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        if (pathname === '/login') {
          navigate('/')
        }
      } else {
        setIsAuthenticated(false)
        if (pathname !== '/login') {
          navigate('/login')
        }
      }
    })

    return () => {
      unsubscribe()
    }
  }, [pathname, navigate])

  return { isAuthenticated }
}

export default useAuth
