import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '88OEM - OEM Dashboard',
  description: '88TOY OEM Manufacturing Dashboard - Notion + NAS Integration',
  keywords: ['OEM', 'Manufacturing', 'Dashboard', '88TOY', 'Notion'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Navigation Header */}
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <a href="/" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">88OEM</a>
                  </div>
                  <div className="hidden md:ml-6 md:flex md:space-x-8">
                    <a href="/dashboard" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                      대시보드
                    </a>
                    <a href="/orders" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                      주문 관리
                    </a>
                    <a href="/production" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                      생산 현황
                    </a>
                    <a href="/analytics" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                      분석
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">88TOY OEM Dashboard</span>
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  © 2025 88TOY OEMBoard. All rights reserved.
                </p>
                <div className="flex space-x-4">
                  <span className="text-xs text-gray-400">v0.1.0</span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}