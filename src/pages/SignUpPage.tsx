import { useState } from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { app } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import Form from '@/components/Form'
import ButtonLink from '@/components/common/Button/ButtonLink'
import { PATH } from '@/constants/path'
import { fontSize, fontWeight } from '@/constants/font'
import logo from '@/assets/myidoru_logo.svg'

const SignUpPage = () => {
  const navigate = useNavigate()
  const [firebaseError, setFirebaseError] = useState('')
  const auth = getAuth(app)

  const handleSignUp = ({ email, password }: { email: string; password: string }) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
        console.error('Firebase error:', error.code, error.message)
        setFirebaseError(`${error.code}: ${error.message}`)
      })
  }

  return (
    <Container>
      <div className="logo-container">
        <img src={logo} alt="logo-myidoru" />
      </div>
      <Form
        title="회원가입"
        onSubmit={handleSignUp}
        firebaseError={firebaseError}
        includeConfirmPassword={true}
      />

      <ButtonLink variant="text" to={PATH.LOGIN}>
        이미 계정이 있으신가요? 로그인하기
      </ButtonLink>
    </Container>
  )
}

export default SignUpPage

const Container = styled.div`
  padding: 62px 20px;

  .logo-container {
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: ${fontSize.xl};
    font-weight: ${fontWeight.bold};
  }
`
