import styled from '@emotion/styled'
import React from 'react'
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PATH } from '@/constants/path'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(true)
  const isValid = email && password

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      localStorage.setItem('userData', JSON.stringify(userCredential.user))
      setLoginSuccess(true)
    } catch (error) {
      setPassword('')
      setLoginSuccess(false)
    }
  }

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    const res = await signInWithPopup(auth, provider)
    localStorage.setItem('userData', JSON.stringify(res.user))
  }

  return (
    <Container>
      <img className="logo-myidoru" src="/src/assets/myidoru_logo.svg" alt="logo-myidoru" />
      <form className="form-login" onSubmit={handleEmailLogin}>
        <input
          className="input-email"
          type="text"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input-pw"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!loginSuccess && (
          <span className="login-notice">아이디 또는 비밀번호를 입력해주세요.</span>
        )}

        <button className="btn-login" type="submit" disabled={!isValid}>
          로그인
        </button>
      </form>
      <Link to={PATH.EDITPW} className="forgot-password">
        비밀번호를 잊으셨나요?
      </Link>
      <div className="grayline" />
      <button className="btn-google" onClick={handleGoogleLogin}>
        <img
          className="logo-google"
          width="20"
          height="20"
          src="https://img.icons8.com/color/48/google-logo.png"
          alt="google-logo"
        />
        구글 로그인
      </button>
    </Container>
  )
}

export default LoginPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 62px 20px;

  .logo-myidoru {
    margin-bottom: 40px;
    box-sizing: border-box;
  }

  .form-login {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 400px;
  }

  .input-email,
  .input-pw,
  .btn-login,
  .btn-google {
    width: 100%;
    padding: 16px 18px;
    box-sizing: border-box;
  }

  .btn-login {
    margin-top: 5px;
  }

  .forgot-password {
    text-align: center;
    margin: 15px 0;
    font-size: 15px;
    display: block;
  }

  .grayline {
    width: 100%;
    height: 1px;
    background-color: #f5f5f5;
    margin: 15px 0;
  }

  .btn-google {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 1rem;
  }

  .logo-google {
    vertical-align: middle;
  }

  .login-notice {
    color: red;
    font-size: 15px;
    text-align: center;
  }
`
