import React, { FormEvent, useState } from 'react'
import Input from '../../components/ui_components/Input'
import { EmailOutlined } from '@mui/icons-material'

interface RegisterForm {
  email: string | null,
  password: string | null,
  confirm_password: string | null,
  username: string | null,
  age: number | null,
  agreement: boolean | null
}

const Register = () => {
  const [formState, setFormState] = useState<RegisterForm | null>(null)

  const registerUser = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <form className='d-flex flex-column bg-info' onSubmit={registerUser}>
      <Input
        icon={EmailOutlined}
        type='email'
        fullWidth={true}
        name='email'
        onChange={() => {}}
        value='test@gmail.com'
        placeHolder='Email'
        />
    </form>
  )
}

export default Register