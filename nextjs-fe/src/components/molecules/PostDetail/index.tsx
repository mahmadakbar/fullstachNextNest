import IMG from '@assets/images'
import { PostInterface } from '@interfaces/InterfacePost'
import { base64toUrl } from '@utils/common'
import moment from 'moment'
import Image from 'next/image'
import React from 'react'

type isMiniCard = {
  miniCard?: boolean
}

export default function PostDetail({
  miniCard = false,
  image,
  title,
  content,
  publish,
  createdAt,
}: Readonly<PostInterface & isMiniCard>) {
  return (
    <div className="w-full h-full">
      <div className="absolute bg-black w-full h-full opacity-0 hover:opacity-5 top-0 rounded-lg" />

      <Image
        src={image ? base64toUrl(image as string) : IMG.EMPTY}
        alt="image_empty"
        width={0}
        height={0}
        className={`w-full ${miniCard ? ' h-[170px]' : ''} object-cover`}
      />

      <div className="p-4 flex flex-col">
        <h1
          className={`text-[#0A0A0A] text-2xl font-bold ${
            miniCard ? 'overflow-hidden text-ellipsis whitespace-nowrap' : ''
          } `}
        >
          {title}
        </h1>

        <p
          className={`text-[##95a5a6] text-sm font-normal first-line ${
            miniCard ? 'overflow-hidden text-ellipsis whitespace-nowrap' : 'mb-8'
          }`}
        >
          {content}
        </p>
        <p
          className={`${publish ? 'text-[#6c4b15]' : 'text-[#7494ad]'} text-[10px] font-normal
            absolute bottom-4 left-4 ${publish ? 'bg-yellow-300' : 'bg-blue-300'} p-2 rounded-md`}
        >
          {publish ? 'Published' : 'Draft'}
        </p>
        <p
          className={`flex self-end text-[##95a5a6] text-sm font-normal ${
            miniCard ? 'absolute bottom-4 right-4' : ''
          } `}
        >
          {moment(createdAt).format('DD MMM YYYY')}
        </p>
      </div>
    </div>
  )
}
