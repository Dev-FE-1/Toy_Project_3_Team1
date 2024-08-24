import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { PATH } from '../constants/path'
const ProfilePage = () => {
  return (
    <div>
      Profile Page
      <Link to={PATH.EDITPROFILE}>Edit Profile</Link>
      <Outlet />
    </div>
  )
}

export default ProfilePage
