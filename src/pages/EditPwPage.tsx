import styled from '@emotion/styled'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import { useState } from 'react'

const EditPwPage = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<boolean | null>(null)
  const isValid = email

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(auth, email)
      setMessage(true)
    } catch (error) {
      setMessage(false)
      setEmail('')
    }
  }
  return (
    <Container>
      <h2>비밀번호를 잊으셨나요?</h2>
      <h4>
        가입하신 이메일을 입력하시면
        <br /> 비밀번호 재설정 링크를 보내드립니다.
      </h4>
      <form className="form_editpw" onSubmit={handleResetPassword}>
        <input
          type="text"
          className="input_editpw"
          placeholder="이메일을 입력하세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {message !== null &&
          (message ? (
            <span className="success">비밀번호 재설정 링크가 이메일로 전송되었습니다.</span>
          ) : (
            <span className="failed">
              비밀번호 재설정 링크 전송에 실패했습니다. 다시 시도해주세요.
            </span>
          ))}
        <button type="submit" className="btn_editpw" disabled={!isValid}>
          비밀번호 재설정 링크 보내기
        </button>
      </form>
    </Container>
  )
}

export default EditPwPage

const Container = styled.div`
  .form_editpw {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .btn_editpw,
  .input_editpw {
    padding: 10px;
  }
  .success,
  .failed {
    font-size: 10px;
  }
  .message {
    color: blue;
  }
`
