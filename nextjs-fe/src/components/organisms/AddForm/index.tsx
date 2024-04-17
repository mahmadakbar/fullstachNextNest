'use client'

import IconTrash from '@assets/icons/IconTrash'
import TextInput from '@components/atoms/TextInput'
import Button from '@components/atoms/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { apiPostAdd } from '@services/api/apiPostData'
import { convertToBase64 } from '@utils/common'
import { addPostScheme } from '@utils/helper/yup/postScheme'
import Image from 'next/image'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ListForm from '../ListForm'

export interface FormAddPost {
  title: string
  content?: string
  published?: boolean
  image?: FileList | null | string
}

export default function AddForm() {
  const [load, setLoad] = useState(false)
  const form = useForm<FormAddPost>({
    defaultValues: {
      title: '',
      content: '',
      published: false,
      image: undefined,
    },
    resolver: yupResolver(addPostScheme),
    mode: 'onChange',
  })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form

  const image = watch('image') as FileList | null

  const onSubmited = async (data: FormAddPost) => {
    const base64img = image?.[0] ? await convertToBase64(image[0]) : null
    const dataRegister = {
      title: data.title,
      content: data.content,
      published: data.published,
      image: base64img,
    }

    setLoad(true)

    await apiPostAdd(dataRegister)
      .then(res => {
        if (res.status === 'success') {
          toast.success('Add Post Success')
        } else {
          toast.error('Add Post Failed')
        }
      })
      .finally(() => {
        form.reset()
        setLoad(false)
      })
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmited)} className="flex flex-col gap-7 w-9/12 ml-10 md:ml-24 lg:1/6">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <TextInput
              {...register('title')}
              tittle="title"
              type="text"
              placeholder="title"
              error={errors.title?.message}
            />
            <TextInput {...register('content')} tittle="content" type="textArea" placeholder="content" rows={5} />
            <TextInput {...register('published')} tittle="published" type="checkbox" placeholder="published" />
          </div>
          {image?.[0] && image?.[0].size <= 1048576 ? (
            <div className="flex flex-1 ml-10 border justify-center items-center overflow-hidden w-52 h-52 rounded-md border-[#C2C2C2] relative bg-white">
              <Image
                alt={image[0].name}
                src={URL.createObjectURL(image[0])}
                width={230}
                height={230}
                className="object-contain"
              />

              <button
                onClick={() =>
                  form.reset({
                    image: undefined,
                  })
                }
                className="absolute bottom-0 right-0 p-2 bg-slate-200 rounded-lg hover:bg-slate-300"
              >
                <IconTrash className="w-6 h-6 hover:text-white" />
              </button>
            </div>
          ) : (
            <TextInput
              className="ml-10"
              {...register('image')}
              tittle="Upload Image"
              type="file"
              placeholder="image"
              accept="image/*"
              error={errors.image?.message}
            />
          )}
        </div>
        <Button type="submit" title="Add Post" />
      </form>

      <ListForm load={load} />
    </div>
  )
}
