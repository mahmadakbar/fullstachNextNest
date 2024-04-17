'use client'

import IconArrowLeft from '@assets/icons/IconArrowLeft'
import TextInput from '@components/atoms/TextInput'
import Button from '@components/atoms/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { apiRegister } from '@services/api/apiRegister'
import { registerScheme } from '@utils/helper/yup/authScheme'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

interface FormRegister {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterForm() {
  const router = useRouter()
  const form = useForm<FormRegister>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(registerScheme),
    mode: 'onChange',
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const onSubmited = async (data: FormRegister) => {
    const dataRegister = {
      name: data.name,
      email: data.email,
      password: data.password,
    }
    await apiRegister(dataRegister).then(res => {
      if (res.status === 'success') {
        toast.success('Register Success')
        router.push('/login')
      } else {
        toast.error('Register Failed')
      }
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmited)} className="flex flex-col gap-7 w-4/5 md:w-3/6 md:ml-24 lg:1/6">
      <Link href={'/login'} className="flex self-start">
        <IconArrowLeft />
      </Link>
      <h1 className="text-3xl font-semibold">Register</h1>
      <TextInput {...register('name')} tittle="name" type="text" placeholder="name" error={errors.name?.message} />
      <TextInput {...register('email')} tittle="email" type="text" placeholder="email" error={errors.email?.message} />
      <TextInput
        {...register('password')}
        tittle="Password"
        type="text"
        placeholder="Password"
        error={errors.password?.message}
      />
      <TextInput
        {...register('confirmPassword')}
        tittle="Confirm Password"
        type="text"
        placeholder="Confirm Password"
        error={errors.confirmPassword?.message}
      />
      <Button type="submit" title="Register" />
    </form>
  )
}
