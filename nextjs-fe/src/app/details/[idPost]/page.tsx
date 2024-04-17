import UpdateForm from '@components/organisms/UpdateForm'
import satellite from '@services/satellite'
import React from 'react'

type UUIDType = {
  params: { idPost: string }
}

export function generateMetadata({ params: { idPost } }: UUIDType) {
  return {
    title: `post ${idPost}`,
  }
}

async function getPostbyID(idPost: string) {
  return await satellite
    .get('post/getOne/' + idPost)
    .then(res => {
      return { status: 'success', data: res.data.data }
    })
    .catch(err => {
      return { status: 'failed', data: err.data }
    })
}

export default async function DetailbyUUID({ params: { idPost } }: Readonly<UUIDType>) {
  const getPost = await getPostbyID(idPost)

  return (
    <div className="h-screen overflow-scroll">
      <UpdateForm dataPost={getPost.data} />
    </div>
  )
}
