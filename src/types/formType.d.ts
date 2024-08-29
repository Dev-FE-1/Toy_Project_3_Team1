export interface FormInputs {
  email: string
  password: string
}

export interface FormProps {
  title: string
  getDataForm: (data: FormInputs) => void
  firebaseError?: string
}
