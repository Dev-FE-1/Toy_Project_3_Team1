import { FormInputs, FormProps } from '@/types/formType'
import { useForm } from 'react-hook-form'

const Form: React.FC<FormProps> = ({ title, getDataForm, firebaseError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    mode: 'onChange',
  })

  const onSubmit = ({ email, password }: FormInputs) => {
    getDataForm({ email, password })
    reset()
  }

  const userEmail = {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: '이메일 형식이 올바르지 않습니다.',
    },
  }

  const userPassword = {
    required: '비밀번호를 입력해주세요.',
    minLength: {
      value: 6,
      message: '비밀번호는 6자 이상이어야 합니다.',
    },
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input type="email" placeholder="E-mail" {...register('email', userEmail)} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <input type="password" placeholder="password" {...register('password', userPassword)} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">{title}</button>
      {firebaseError && <p>{firebaseError}</p>}
    </form>
  )
}

export default Form
