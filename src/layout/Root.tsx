import { Outlet, useLocation } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'
import styled from '@emotion/styled'
import { colors } from '@/constants/color'
import { PATH } from '@/constants/path'
import BackHeader from '@/components/layout/header/BackHeader'
import checkAuth from '@/service/auth/checkAuth'

const RootLayout = () => {
  const location = useLocation()
  const showBackButton = location.pathname === PATH.SIGNUP || location.pathname === PATH.EDITPW

  return (
    <Container>
      <div className="background-overlay" />
      <div className="root">
        {checkAuth() ? (
          <>
            <Header />
            <Outlet />
            <Navbar />
          </>
        ) : (
          <>
            {showBackButton && <BackHeader />}
            <Outlet />
          </>
        )}
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
`
