import RegisterForm from '@components/organisms/RegisterForm'
import React from 'react'

export const metadata = {
  title: 'Register',
}

export default function Register() {
  return (
    <div className="flex justify-center flex-col items-center min-h-screen bg-white">
      <RegisterForm />
    </div>
  )
}
