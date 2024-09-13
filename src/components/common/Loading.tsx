import { colors } from '@/styles/colors'
import styled from '@emotion/styled'
import NPProfile from '@/assets/np_logo.svg'

const Loading = () => {
  return (
    <LoadingContainer>
      <div className="spinner"></div>
      <div className="logo">
        <img src={NPProfile} alt="로고" />
      </div>
    </LoadingContainer>
  )
}

export default Loading

const LoadingContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 104px);

  .spinner {
    width: 80px;
    height: 80px;
    border: 5px solid ${colors.lightGray};
    border-top: 5px solid ${colors.primaryPurple};
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  .logo {
    position: absolute;
    height: 36px;

    img {
      height: 100%;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
