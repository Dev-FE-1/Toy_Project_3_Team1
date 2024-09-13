import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from '@/constants/path'
import { useAuth } from '@/hooks/auth/useAuth'

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Outlet /> : <Navigate to={PATH.LOGIN} replace />
}

export default PrivateRoute
