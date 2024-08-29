import { useState } from 'react'
import Form from '@/components/Form'
import { useNavigate } from 'react-router-dom'
import { app } from '@/firebase/firebaseConfig'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { FormInputs } from '@/types/formType'

const SignUp = () => {
  const navigate = useNavigate()
  const [firebaseError, setFirebaseError] = useState('')

  const auth = getAuth(app)
  const handleSignupAndLogin = ({ email, password }: FormInputs) => {
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
    <Form title={'회원가입'} getDataForm={handleSignupAndLogin} firebaseError={firebaseError} />
  )
}

export default SignUp
