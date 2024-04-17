'use server'

import { FormAddPost } from '@components/organisms/AddForm'
import satellite from '@services/satellite'
import { cookies } from 'next/headers'

export const apiPostAdd = async (data: FormAddPost) => {
  const user = JSON.parse(cookies().get('TOKEN')?.value ?? '')
  return await satellite
    .post('post/add/' + user.uuid, data)
    .then(res => {
      return { status: 'success', data: res.data.data }
    })
    .catch(err => {
      return { status: 'failed', data: err.data }
    })
}

export const apiPostUpdate = async (uuid: string, data: FormAddPost) => {
  return await satellite
    .post('post/update/' + uuid, data)
    .then(res => {
      return { status: 'success', data: res.data.data }
    })
    .catch(err => {
      return { status: 'failed', data: err.data }
    })
}

export const apiPostDelete = async (uuid: string) => {
  return await satellite
    .delete('post/delete/' + uuid)
    .then(res => {
      return { status: 'success', data: res.data.data }
    })
    .catch(err => {
      return { status: 'failed', data: err.data }
    })
}
