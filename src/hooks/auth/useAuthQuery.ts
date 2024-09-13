import { useQuery } from '@tanstack/react-query'
import checkAuth from '@/service/auth/checkAuth'

export const useAuthQuery = () => {
  return useQuery<boolean, Error>({
    queryKey: ['authStatus'],
    queryFn: checkAuth,
  })
}
