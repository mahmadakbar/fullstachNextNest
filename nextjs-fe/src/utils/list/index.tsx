import IconHome from '@assets/icons/IconHome'

import IconDetail from '@assets/icons/IconDetail'

const MENU_HEADER = [
  {
    id: 'Home-01',
    name: 'Home',
    href: '/',
    icon: 'IconHome',
  },
  {
    id: 'Detaills-05',
    name: 'Details',
    href: '/details',
    icon: 'IconDetails',
  },
]

const ICON_MENU = {
  IconHome: ({ color }: { color: string }) => <IconHome className="w-5 h-5" color={color} />,
  IconDetails: ({ color }: { color: string }) => <IconDetail className="w-5 h-5" color={color} />,
}

export { MENU_HEADER, ICON_MENU }
