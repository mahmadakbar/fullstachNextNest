import { usePathname } from 'next/navigation'

export default function useNamePage() {
  const pathname = usePathname()
  const namePage = pathname.split('/')[1]

  if (namePage === '') {
    return 'Home'
  }

  if (namePage === 'smpstatus') {
    return 'SMP Status'
  }

  return namePage[0].toUpperCase() + namePage.slice(1)
}
