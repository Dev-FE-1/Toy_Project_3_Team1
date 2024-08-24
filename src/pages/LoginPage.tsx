import styled from '@emotion/styled'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

const LoginPage = () => {
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const res = await signInWithPopup(auth, provider)
      localStorage.setItem('userData', JSON.stringify(res.user))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Contaier>
      <div className="google_login">
        <button className="google_btn" onClick={handleGoogleLogin}>
          <img
            className="google_logo"
            width="20"
            height="20"
            src="https://img.icons8.com/color/48/google-logo.png"
            alt="google-logo"
          />
          구글 로그인
        </button>
      </div>
    </Contaier>
  )
}

export default LoginPage

const Contaier = styled.div`
  .google_logo {
    align-items: center;
  }
  .google_login {
    display: flex;
    flex-direction: column;
  }
  .google_btn {
    border-radius: 0.3rem;
    vertical-align: center;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    gap: 7px;
    display: flex;
    text-align: center;
  }
`
