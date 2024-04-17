import LoginForm from '@components/organisms/LoginForm'
import Link from 'next/link'
import React from 'react'

export const metadata = {
  title: 'Login',
}

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white">
      <LoginForm />
      <div className="flex flex-row text-sm mt-1">
        <p className="text-center mt-2">Don't have an account?</p>

        <Link href={'/register'} className="ml-1 text-blue-800">
          <p className="text-center mt-2">Register</p>
        </Link>
      </div>
    </div>
  )
}
