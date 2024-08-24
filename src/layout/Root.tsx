import styled from '@emotion/styled'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Navbar from '../components/layout/Navbar'
import Header from '../components/layout/Header'

const RootLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  if (isAuthenticated && location.pathname === '/login') {
    navigate('/')
  }

  return (
    <StyledContainer>
      {isAuthenticated && location.pathname !== '/login' && <Header />}
      <Outlet />
      {isAuthenticated && location.pathname !== '/login' && <Navbar />}
    </StyledContainer>
  )
}

export default RootLayout

const StyledContainer = styled.div`
  min-width: 500px;
  min-height: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`
