import styled from '@emotion/styled'
import React, { useState } from 'react'
import { PATH } from '@/constants/path'
import logo from '@/assets/myidoru_logo.svg'
import { fontSize } from '@/constants/font'
import Button from '@/components/common/Button/Button'
import ButtonLink from '@/components/common/Button/ButtonLink'
import ButtonImage from '@/components/common/Button/ButtonImage'
import Input from '@/components/common/Input/Input'
import { colors } from '@/constants/color'
import { MESSAGES } from '@/constants/messages'
import login from '@/service/auth/login'
import { useNavigate } from 'react-router-dom'
import googleLogin from '@/service/auth/googleLogin'

const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })
  const [isLoginError, setIsLoginError] = useState(false)
  const navigate = useNavigate()
  //TODO: 이메일, 비밀번호 유효성 검사하기
  const isValid = loginInfo.email && loginInfo.password

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    })
  }

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = loginInfo
    const isLoginSuccess = await login(email, password)

    if (isLoginSuccess) {
      navigate('/')
    } else {
      setIsLoginError(true)
      setLoginInfo({
        email: '',
        password: '',
      })
    }
  }

  const handleGoogleLogin = async () => {
    await googleLogin()
  }

  return (
    <Container>
      <div className="logo-container">
        <img src={logo} alt="logo-myidoru" />
      </div>

      <div className="login-container">
        <form className="form-login" onSubmit={handleEmailLogin}>
          <Input
            type="text"
            name="email"
            placeholder="이메일을 입력해주세요."
            value={loginInfo.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            value={loginInfo.password}
            onChange={handleChange}
          />
          {isLoginError && <span className="login-notice">{MESSAGES.LOGIN.FAIL}</span>}
          <Button disabled={!isValid}>로그인</Button>
        </form>
        <ButtonLink size={'small'} variant="text" to={PATH.EDITPW}>
          비밀번호를 잊으셨나요?
        </ButtonLink>
      </div>

      <div className="divider">
        <span>또는</span>
      </div>

      <div className="auth-container">
        <Button variant="outline" onClick={handleGoogleLogin}>
          <ButtonImage alt="google-logo" src="https://img.icons8.com/color/48/google-logo.png" />
          구글 로그인
        </Button>
        <ButtonLink variant="secondary" to={PATH.SIGNUP}>
          이메일로 회원가입
        </ButtonLink>
      </div>
    </Container>
  )
}

export default LoginPage

const Container = styled.div`
  padding: 62px 20px;

  .logo-container {
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
  }

  .login-container {
    margin-bottom: 22px;
    .form-login {
      margin-bottom: 18px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }

    .login-notice {
      color: ${colors.red};
      font-size: ${fontSize.sm};
    }
  }

  .divider {
    margin-bottom: 22px;
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;

    &::before,
    &::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid ${colors.lightGray};
    }

    &::before {
      margin-right: 16px;
    }

    &::after {
      margin-left: 16px;
    }

    & span {
      color: ${colors.gray};
      font-size: ${fontSize.sm};
      white-space: nowrap;
    }
  }

  .auth-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`
