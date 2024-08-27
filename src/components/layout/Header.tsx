import styled from '@emotion/styled'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import logo from '@/assets/myidoru_logo.svg'
import { PATH } from '@/constants/path'
import { colors } from '@/constants/color'

interface HeaderProps {
  onBack?: () => void
}

const Header: React.FC<HeaderProps> = ({ onBack }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const pathDepth = location.pathname.split('/').filter(Boolean).length

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <Container>
      {pathDepth < 2 ? (
        <Link to={PATH.HOME}>
          <img className="logo-myidoru" src={logo} alt="logo" />
        </Link>
      ) : (
        <button className="button-back" onClick={handleBack} aria-label="Go back">
          <ArrowLeft />
        </button>
      )}
    </Container>
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
