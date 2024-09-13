import useAuthStore from '@/stores/useAuthStore'
import { useEffect } from 'react'
import { useAuthQuery } from './useAuthQuery'

export const useAuth = () => {
  const { setAuthenticated } = useAuthStore()
  const { data: isAuthenticated, isLoading, error } = useAuthQuery()

  useEffect(() => {
    if (isAuthenticated !== undefined) {
      setAuthenticated(isAuthenticated)
    }
  }, [isAuthenticated, setAuthenticated])

  return { isAuthenticated, isLoading, error }
}
