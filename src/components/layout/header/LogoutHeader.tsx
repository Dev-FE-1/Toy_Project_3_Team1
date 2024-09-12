import styled from '@emotion/styled'
import { colors } from '@/styles/colors'
import { LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logout from '@/service/auth/logout'
import { fontSize } from '@/styles/font'
import { fontWeight } from '@/styles/font'

interface LogoutHeaderProps {
  userId: string
}

const LogoutHeader = ({ userId }: LogoutHeaderProps) => {
  const navigate = useNavigate()

  const logoutBtnHandler = async () => {
    const isLogoutSuccess = await logout()
    if (isLogoutSuccess) navigate('/login')
  }

  return (
    <Container>
      {userId}
      <button className="button-logout" onClick={logoutBtnHandler}>
        <LogOut size={20} />
      </button>
    </Container>
  )
}

export default LogoutHeader

const Container = styled.div`
  width: 100%;
  max-width: 430px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.bold};

  .button-logout {
    background-color: ${colors.white};
    border: none;
    cursor: pointer;
    margin: 16px;
  }
`
