import styled from '@emotion/styled'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Navbar from '@/components/layout/Navbar'
import Header from '@/components/layout/Header'
import { colors } from '@/constants/color'

const RootLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const showHeader =
    (isAuthenticated && location.pathname !== 'login') ||
    location.pathname === '/login/editpassword' ||
    location.pathname === '/login/signup'
  const showNavBar =
    isAuthenticated && !['/login', '/login/editpassword'].includes(location.pathname)

  if (isAuthenticated && location.pathname === '/login') {
    navigate('/')
  }

  return (
    <Container>
      <div className="background-overlay" />
      <div className="root">
        {showHeader && <Header />}
        <div className="main">
          <Outlet />
        </div>
        {showNavBar && <Navbar />}
      </div>
    </Container>
  )
}

export default RootLayout

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  .background-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${colors.lightestGray};
    z-index: 1;
  }

  .root {
    position: relative;
    z-index: 2;
    justify-content: space-between;
    max-width: 430px;
    min-height: 100%;
    margin: 0 auto;
    padding-bottom: 52px;
    background-color: ${colors.white};
  }

  .main {
    padding: 20px;
    flex: 1;
  }
`
