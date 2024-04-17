'use client'

import PostDetail from '@components/molecules/PostDetail'
import satellite from '@services/satellite'
import { getItem } from '@store/storage'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { PostInterface } from '@interfaces/InterfacePost'

export default function ListForm({ load }: Readonly<{ load: boolean }>) {
  const [idUser, setIdUser] = useState()

  useEffect(() => {
    const ids = getItem('login_info')?.uuid
    setIdUser(ids)
  }, [])

  const { isLoading, error, data } = useQuery({
    queryKey: ['getAllUser', { load }],
    queryFn: () => satellite.get('/post/' + idUser).then(response => response.data.data),
    enabled: !!idUser,
  })

  if (isLoading) return <div className="text-center mt-5">Loading</div>
  if (error) return <div className="text-center mt-5">Error</div>

  return (
    <div className="border-t-2 border-[#C2C2C2] mt-8 p-5 grid grid-cols-2 gap-4">
      {data?.posts?.map((item: PostInterface) => (
        <Link
          key={item.uuid}
          href={`/details/${item.uuid}`}
          className="bg-white rounded-lg min-h-[300px] shadow-md hover:shadow-lg relative"
        >
          <PostDetail miniCard {...item} />
        </Link>
      ))}
    </div>
  )
}
