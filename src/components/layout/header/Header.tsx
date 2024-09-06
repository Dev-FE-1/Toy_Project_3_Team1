import styled from '@emotion/styled'
import { useLocation, Link, useParams } from 'react-router-dom'
import logo from '@/assets/myidoru_logo.svg'
import { PATH } from '@/constants/path'
import { colors } from '@/constants/color'
import BackHeader from '@/components/layout/header/BackHeader'
import LogoutHeader from '@/components/layout/header/LogoutHeader'
import useIsMyProfile from '@/hooks/useIsMyProfile'

const Header = () => {
  const location = useLocation()
  const { userId } = useParams<{ userId: string }>()
  const isMyProfile = useIsMyProfile(userId)
  const pathDepth = location.pathname.split('/').filter(Boolean).length
  const isUserProfilePath = /^\/profile\/[^/]+$/.test(location.pathname)

  return (
    <>
      {pathDepth < 2 || !isUserProfilePath ? (
        <Container>
          <Link to={PATH.HOME}>
            <img className="logo-myidoru" src={logo} alt="logo" />
          </Link>
        </Container>
      ) : isMyProfile ? (
        <LogoutHeader userId={userId || ''} />
      ) : (
        <BackHeader />
      )}
    </>
  )
}

export default Header

const Container = styled.div`
  width: 100%;
  max-width: 430px;
  height: 52px;

  .logo-myidoru {
    width: 114px;
    margin: 10px 20px 0;
  }
  .button-back {
    background-color: ${colors.white};
    border: none;
    cursor: pointer;
    margin: 16px;
  }
`
