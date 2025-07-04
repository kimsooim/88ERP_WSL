import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: '88ERP - Enterprise Resource Planning System',
  description: '88TOY 통합 업무 관리 시스템',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link 
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-pretendard">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}