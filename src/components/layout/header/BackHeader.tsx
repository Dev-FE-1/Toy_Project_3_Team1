import styled from '@emotion/styled'
import { colors } from '@/constants/color'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const BackHeader = () => {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }
  return (
    <Container>
      <button className="button-back" onClick={handleBack} aria-label="Go back">
        <ArrowLeft />
      </button>
    </Container>
  )
}

export default BackHeader

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
