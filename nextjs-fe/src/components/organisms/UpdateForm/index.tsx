'use client'

import IconTrash from '@assets/icons/IconTrash'
import TextInput from '@components/atoms/TextInput'
import Button from '@components/atoms/button'
import { yupResolver } from '@hookform/resolvers/yup'
import { apiPostDelete, apiPostUpdate } from '@services/api/apiPostData'
import { base64toUrl, convertToBase64 } from '@utils/common'
import { addPostScheme } from '@utils/helper/yup/postScheme'
import Image from 'next/image'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import PostDetail from '@components/molecules/PostDetail'
import { PostInterface } from '@interfaces/InterfacePost'
import { FormAddPost } from '../AddForm'
import { useRouter } from 'next/navigation'

export default function UpdateForm({ dataPost }: Readonly<{ dataPost: PostInterface }>) {
  const route = useRouter()
  const [data, setData] = React.useState(dataPost)
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

  useEffect(() => {
    if (dataPost) {
      form.reset({
        title: dataPost.title,
        content: dataPost.content,
        published: dataPost.publish,
        image: dataPost.image || undefined,
      })
    }
  }, [dataPost])

  const image = watch('image') as FileList | undefined

  const onSubmited = async (data: FormAddPost) => {
    const base64img = data.image ? data.image : image?.[0] ? await convertToBase64(image[0]) : undefined
    const dataRegister = {
      title: data.title,
      content: data.content,
      published: data.published,
      image: base64img,
    }

    await apiPostUpdate(dataPost.uuid, dataRegister).then(res => {
      if (res.status === 'success') {
        toast.success('Update Post Success')
        setData(res.data)
      } else {
        toast.error('Update Post Failed')
      }
    })
  }

  const onDelete = async () => {
    await apiPostDelete(dataPost.uuid).then(res => {
      if (res.status === 'success') {
        toast.success('Delete Post Success')
        route.push('/')
      } else {
        toast.error('Delete Post Failed')
      }
    })
  }

  return (
    <div className="my-10">
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
            <TextInput
              {...register('published')}
              tittle="published"
              type="checkbox"
              placeholder="published"
              checked={watch('published')}
            />
          </div>
          {data.image || (image?.[0] && image?.[0].size <= 1048576) ? (
            <div className="flex flex-1 ml-10 border justify-center items-center overflow-hidden w-52 h-52 rounded-md border-[#C2C2C2] relative bg-white">
              <Image
                alt={image?.[0]?.name ?? data?.title ?? ''}
                src={data.image ? base64toUrl(data.image as string) : URL.createObjectURL(image?.[0] as Blob)}
                width={230}
                height={230}
                className="object-contain"
              />

              <button
                onClick={() => {
                  form.reset({
                    image: undefined,
                  })
                  setData({ ...data, image: undefined })
                }}
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

        <div className="flex flex-row border w-full gap-2">
          <Button color={'bg-[#1abc9c]'} type="submit" title="Update Post" />
          <Button color={'bg-[#e74c3c]'} title="Delete" onClick={onDelete} />
        </div>
      </form>

      <div className="mt-10 border mx-10 relative bg-white">
        <PostDetail {...data} />
      </div>
    </div>
  )
}
