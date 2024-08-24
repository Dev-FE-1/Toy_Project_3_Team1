import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import Header from '@/components/layout/Header'

const RootLayout = () => (
  <StyledContainer>
    <Header />
    <Outlet />
    <Navbar />
  </StyledContainer>
)

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

export default RootLayout
