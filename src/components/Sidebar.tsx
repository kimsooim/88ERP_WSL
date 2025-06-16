import Link from 'next/link'
import { useRouter } from 'next/router'

const menuItems = [
  { name: '대시보드', href: '/', icon: '📊' },
  { name: '프로젝트', href: '/projects', icon: '📁' },
  { name: '주문 관리', href: '/orders', icon: '📦' },
  { name: '재고 관리', href: '/inventory', icon: '📋' },
  { name: '생산 현황', href: '/production', icon: '🏭' },
  { name: '보고서', href: '/reports', icon: '📈' },
  { name: '설정', href: '/settings', icon: '⚙️' },
]

export default function Sidebar() {
  const router = useRouter()

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6">
        <Link href="/">
          <h2 className="text-xl font-bold text-gray-800 hover:text-blue-600 cursor-pointer">88OEM</h2>
          <p className="text-sm text-gray-600">OEM 대시보드</p>
        </Link>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
              router.pathname === item.href ? 'bg-blue-50 border-r-2 border-blue-600 text-blue-600' : ''
            }`}
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-64 p-6 border-t">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-800">Ann</p>
            <p className="text-xs text-gray-600">관리자</p>
          </div>
        </div>
      </div>
    </div>
  )
}