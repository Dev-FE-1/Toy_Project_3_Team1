import { Outlet, Link } from 'react-router-dom'
import { PATH } from '@/constants/path'
const ProfilePage = () => {
  return (
    <div>
      Profile Page
      <br />
      <Link to={PATH.EDITPROFILE}>프로필 수정</Link>
      <Outlet />
    </div>
  )
}

export default ProfilePage
