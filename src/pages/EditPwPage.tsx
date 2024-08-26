import styled from '@emotion/styled'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
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
      <h3>비밀번호를 잊으셨나요?</h3>
      <h4>
        가입하신 이메일을 입력하시면,
        <br /> 비밀번호 재설정 링크를 보내드립니다.
      </h4>
      <form className="form-editpw" onSubmit={handleResetPassword}>
        <input
          type="text"
          className="input-editpw"
          placeholder="이메일"
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
        <button type="submit" className="btn-editpw" disabled={!isValid}>
          비밀번호 재설정 링크 보내기
        </button>
      </form>
    </Container>
  )
}

export default EditPwPage

const Container = styled.div`
  padding: 62px 20px;
  h4 {
    margin: 22px 0;
  }
  .form_editpw {
    display: flex;
    flex-direction: column;
  }
  .btn-editpw,
  .input-editpw {
    width: 100%;
    padding: 16px 18px;
    margin-bottom: 10px;
  }
  .failed {
    color: red;
  }
  .success,
  .failed {
    font-size: 10px;
  }
  .message {
    color: blue;
  }
`
