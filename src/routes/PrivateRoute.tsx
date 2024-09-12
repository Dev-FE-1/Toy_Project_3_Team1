import { Navigate, Outlet } from 'react-router-dom'
import { PATH } from '@/constants/path'
import checkAuth from '@/service/auth/checkAuth'

const PrivateRoute = () => {
  return checkAuth() ? <Outlet /> : <Navigate to={PATH.LOGIN} replace />
}

export default PrivateRoute
