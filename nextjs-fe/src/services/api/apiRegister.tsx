'use server'

import satellite from '@services/satellite'

export const apiRegister = async (data: { name: string; email: string; password: string }) => {
  return await satellite
    .post('user/register/', data)
    .then(res => {
      return { status: 'success', data: res.data.data }
    })
    .catch(err => {
      return { status: 'failed', data: err.data }
    })
}
