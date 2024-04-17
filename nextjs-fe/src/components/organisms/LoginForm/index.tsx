'use client'

import TextInput from '@components/atoms/TextInput'
import Button from '@components/atoms/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { apiLogin } from '@services/api/apiLogin'
import { setItem } from '@store/storage'
import { loginScheme } from '@utils/helper/yup/authScheme'
import { useRouter } from 'next/navigation'

import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface FormLogin {
  email: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()
  const form = useForm<FormLogin>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(loginScheme),
    mode: 'onChange',
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmited = async (data: FormLogin) => {
    await apiLogin(data).then(async res => {
      if (res.status === 'success') {
        toast.success('Login Success')
        setItem('login_info', res.data)
        router.push('/')
      } else {
        toast.error('Login Failed')
      }
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmited)} className="flex flex-col gap-7 w-4/5 md:w-3/6 md:ml-24 lg:1/6">
      <h1 className="text-3xl font-semibold">Login</h1>
      <TextInput {...register('email')} tittle="email" type="text" placeholder="email" error={errors.email?.message} />
      <TextInput
        {...register('password')}
        tittle="Password"
        type="text"
        placeholder="Password"
        error={errors.password?.message}
      />
      <TextInput tittle="Remember me" type="checkbox" />
      <Button type="submit" title="Login" />
    </form>
  )
}
