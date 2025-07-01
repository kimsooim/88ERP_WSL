export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 모던 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold text-gray-900">88ERP</h1>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">대시보드</a>
                <a href="/orders" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">주문관리</a>
                <a href="/products" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">상품관리</a>
                <a href="/analytics" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">분석</a>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <button className="btn-icon">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-700">Ann</span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <span className="text-white font-medium">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="p-6">
        {/* 환영 메시지 */}
        <div className="mb-8 animate-slideIn">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">안녕하세요, Ann님 👋</h2>
          <p className="text-gray-600">오늘의 비즈니스 현황을 한눈에 확인하세요</p>
        </div>

        {/* 통계 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card animate-slideIn" style={{animationDelay: '0.1s'}}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">오늘 매출</p>
                <p className="text-3xl font-bold text-gray-900">₩2,450,000</p>
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span>12% 증가</span>
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="stat-card animate-slideIn" style={{animationDelay: '0.2s'}}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">신규 주문</p>
                <p className="text-3xl font-bold text-gray-900">24</p>
                <p className="text-sm text-gray-500 mt-2">처리 대기: 3건</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="stat-card animate-slideIn" style={{animationDelay: '0.3s'}}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">생산 진행률</p>
                <p className="text-3xl font-bold text-gray-900">87%</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-blue-600 h-2 rounded-full" style={{width: '87%'}}></div>
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="stat-card animate-slideIn" style={{animationDelay: '0.4s'}}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">재고 알림</p>
                <p className="text-3xl font-bold text-gray-900">5</p>
                <p className="text-sm text-orange-600 mt-2">즉시 확인 필요</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 차트와 최근 활동 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 매출 차트 */}
          <div className="lg:col-span-2 card-modern">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">매출 추이</h3>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5">
                <option>최근 7일</option>
                <option>최근 30일</option>
                <option>최근 90일</option>
              </select>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <p>차트 영역 (Recharts 연동 예정)</p>
            </div>
          </div>

          {/* 최근 활동 */}
          <div className="card-modern">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">최근 활동</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">새 주문 접수</p>
                  <p className="text-xs text-gray-500">코튼푸드 키링 100개 - 방금 전</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">생산 완료</p>
                  <p className="text-xs text-gray-500">쵸바 볼체인 50개 - 15분 전</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">재고 부족 알림</p>
                  <p className="text-xs text-gray-500">원단 재고 10% 미만 - 1시간 전</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 빠른 액션 버튼들 */}
        <div className="mt-8 flex flex-wrap gap-4">
          <button className="btn-primary">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              새 주문 등록
            </span>
          </button>
          <button className="btn-secondary">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              보고서 생성
            </span>
          </button>
          <button className="btn-secondary">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              설정
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}