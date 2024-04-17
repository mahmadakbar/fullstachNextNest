import IconLogout from '@assets/icons/iconLogout'
import { removeItem } from '@store/storage'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function LogoutButton() {
  const router = useRouter()

  const logout = () => {
    removeItem('login_info')
    deleteCookie('TOKEN')
    router.push('/login')
  }
  return (
    <button
      onClick={logout}
      className="cursor-pointer my-6 mx-3 bg-main text-white px-4 py-2 rounded-lg fixed bottom-0 flex flex-row justify-center items-center"
    >
      <IconLogout className="mr-2" />
      <p>Logout</p>
    </button>
  )
}
