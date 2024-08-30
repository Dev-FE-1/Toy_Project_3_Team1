import styled from '@emotion/styled'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/firebase/firebaseConfig'
import { useState } from 'react'
import { fontSize, fontWeight } from '@/constants/font'
import { colors } from '@/constants/color'
import Input from '@/components/common/Input/Input'
import Button from '@/components/common/Button/Button'
import { MESSAGES } from '@/constants/messages'

const EditPwPage = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<boolean | null>(null)
  //TODO: 이메일 유효성 검사하기
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
      <h3 className="editpw-title">비밀번호를 잊으셨나요?</h3>
      <h4 className="editpw-text">
        가입하신 이메일을 입력하시면,
        <br /> 비밀번호 재설정 링크를 보내드립니다.
      </h4>
      <form className="form-editpw" onSubmit={handleResetPassword}>
        <Input
          type="text"
          name="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {message !== null &&
          (message ? (
            <span className="success message">{MESSAGES.RESET_PASSWORD.SUCCESS}</span>
          ) : (
            <span className="failed message">{MESSAGES.RESET_PASSWORD.FAIL}</span>
          ))}

        <Button disabled={!isValid}>비밀번호 재설정 링크 보내기</Button>
      </form>
    </Container>
  )
}

export default EditPwPage

const Container = styled.div`
  padding: 62px 20px;

  .editpw-title {
    margin-bottom: 22px;
    font-size: ${fontSize.xl};
  }

  .editpw-text {
    margin-bottom: 22px;
    font-weight: ${fontWeight.medium};
  }

  .form-editpw {
    display: flex;
    flex-direction: column;
    gap: 10px;

    input {
      margin-bottom: 8px;
    }

    .message {
      font-size: ${fontSize.sm};
    }

    .success {
      color: ${colors.primaryPurple};
    }

    .failed {
      color: ${colors.red};
    }
  }
`
