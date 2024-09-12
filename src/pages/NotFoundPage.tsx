import ButtonLink from '@/components/common/Button/ButtonLink'
import { colors } from '@/styles/colors'
import { fontSize, fontWeight } from '@/styles/font'
import styled from '@emotion/styled'

const NotFoundPage = () => {
  return (
    <NotFoundPageContainer>
      <div className="content-container">
        <div className="title">404</div>
        <h2 className="sub-title">원하시는 페이지를 찾을 수 없습니다.</h2>
        <p className="description">
          원하시는 페이지를 찾을 수 없습니다.
          <br />
          찾으려는 페이지의 주소가 잘못 입력되었거나,
          <br />
          주소의 변경 혹은 삭제로 인해 사용할 수 없습니다.
          <br />
          입력하신 페이지의 주소가 정확한지
          <br />
          다시 한번 확인해 주세요.
        </p>
        <ButtonLink to="/" buttonWidth="180px">
          홈으로 가기
        </ButtonLink>
      </div>
    </NotFoundPageContainer>
  )
}

export default NotFoundPage

const NotFoundPageContainer = styled.div`
  background-color: ${colors.lightestGray};

  .content-container {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 430px;
    height: 100vh;
    background-color: ${colors.white};
    padding: 0 20px;
    text-align: center;
  }

  .title {
    font-size: 100px;
    font-weight: ${fontWeight.extraBold};
    color: ${colors.primaryPurple};
  }

  .sub-title {
    font-size: ${fontSize.xl};
    margin: 0;
    color: ${colors.black};
    margin-bottom: 16px;

    @media (min-width: 400px) {
      font-size: ${fontSize.xxl};
    }
  }

  .description {
    margin: 0;
    margin-bottom: 24px;
    color: ${colors.gray};
    line-height: 1.6;
    @media (min-width: 400px) {
      font-size: ${fontSize.lg};
    }
  }
`
