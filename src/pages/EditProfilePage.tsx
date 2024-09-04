import logout from '@/service/auth/logout'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

const EditProfilePage = () => {
  const navigate = useNavigate()

  const logoutBtnHandler = async () => {
    const isLogoutSuccess = await logout()

    if (isLogoutSuccess) navigate('/login')
  }

  return (
    <div>
      EditProfile
      <LogoutButton onClick={logoutBtnHandler}>로그아웃</LogoutButton>
    </div>
  )
}

export default EditProfilePage

const LogoutButton = styled.button`
  border-radius: 0.3rem;
  vertical-align: center;
  align-items: center;
  font-size: 0.8rem;
  width: 180px;
  display: flex;
  text-align: center;
`
