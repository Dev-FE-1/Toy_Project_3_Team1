import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

interface HeaderProps {
  onBack?: () => void
}

const Header: React.FC<HeaderProps> = ({ onBack }) => {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <StyledContainer>
      <button onClick={handleBack}>BACK</button>
    </StyledContainer>
  )
}

export default Header

const StyledContainer = styled.div`
  border: 1px solid black;
`
