import checkAuth from '@/service/auth/checkAuth'
import useAuthStore from '@/stores/useAuthStore'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const useAuth = () => {
  const { setAuthenticated } = useAuthStore()

  const { data, isLoading, error } = useQuery<boolean, Error>({
    queryKey: ['authStatus'],
    queryFn: checkAuth,
  })

  useEffect(() => {
    if (data !== undefined) {
      setAuthenticated(data)
    }
  }, [data, setAuthenticated])

  return { isAuthenticated: data, isLoading, error }
}

export default useAuth
