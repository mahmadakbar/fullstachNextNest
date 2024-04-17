'use server'

import satellite from '@services/satellite'
import { cookies } from 'next/headers'

export const apiLogin = async (data: { email: string; password: string }) => {
  return await satellite
    .post('user/login/', data)
    .then(res => {
      cookies().set('TOKEN', JSON.stringify(res.data.data))
      return { status: 'success', data: res.data.data }
    })
    .catch(err => {
      return { status: 'failed', data: err.data }
    })
}
