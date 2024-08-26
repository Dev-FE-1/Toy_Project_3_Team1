import { auth } from '@/firebase/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const useAuth = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && pathname === '/login') {
        setIsAuthenticated(true)
        navigate('/')
      } else if (!user && pathname !== '/login' && pathname !== '/login/editpassword') {
        setIsAuthenticated(false)
        navigate('/login')
      }
    })
    return () => {
      unsubscribe()
    }
  }, [pathname, navigate])

  return { isAuthenticated }
}

export default useAuth
