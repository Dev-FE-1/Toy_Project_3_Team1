import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

const useLogout = () => {
  const navigate = useNavigate()
  const logout = async () => {
    await signOut(auth)
      .then(() => {
        navigate('/login')
      })
      .catch((error) => console.error(error))
  }

  return logout
}

export default useLogout
