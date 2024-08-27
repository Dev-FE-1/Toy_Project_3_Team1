import styled from '@emotion/styled'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import logo from '@/assets/myidoru_logo.svg'

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
        <img className="logo-myidoru" src={logo} alt="logo" />
      ) : (
        <ArrowLeft className="button-back" onClick={handleBack} />
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
    cursor: pointer;
    margin: 16px;
  }
`
