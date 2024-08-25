import styled from '@emotion/styled'
import useLogout from '../hooks/useLogout'

const EditProfilePage = () => {
  const logout = useLogout()
  return (
    <div>
      EditProfile
      <LogoutButton onClick={logout}>로그아웃</LogoutButton>
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
