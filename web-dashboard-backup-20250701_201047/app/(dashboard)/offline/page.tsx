'use client';

export default function OfflinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600 mt-1">오프라인 사업 현황을 확인하세요</p>
      </div>
      
      {/* 상단 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-blue-50 border-blue-200">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-600">오늘 매출</p>
                <p className="text-2xl font-bold text-blue-900">486만원</p>
              </div>
              <div className="text-blue-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">전일 대비 +12%</p>
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-green-600">입점 매장</p>
                <p className="text-2xl font-bold text-green-900">42개</p>
              </div>
              <div className="text-green-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">에이랜드 15개, 기타 27개</p>
          </div>
        </div>

        <div className="card bg-yellow-50 border-yellow-200">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-600">재고 알림</p>
                <p className="text-2xl font-bold text-yellow-900">8개</p>
              </div>
              <div className="text-yellow-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-yellow-600 mt-2">긴급 3개, 일반 5개</p>
          </div>
        </div>

        <div className="card bg-purple-50 border-purple-200">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-purple-600">입고 예정</p>
                <p className="text-2xl font-bold text-purple-900">12건</p>
              </div>
              <div className="text-purple-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V2" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-purple-600 mt-2">오늘 3건, 내일 4건</p>
          </div>
        </div>
      </div>

      {/* 중단 차트/리스트 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 매장별 실적 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">매장별 오늘 실적</h3>
          </div>
          <div className="space-y-4">
            {[
              { store: '에이랜드 명동점', sales: '120만원', items: 45, trend: 'up' },
              { store: '에이랜드 강남점', sales: '95만원', items: 38, trend: 'up' },
              { store: '스파오 홍대점', sales: '87만원', items: 42, trend: 'down' },
              { store: '후아유 신촌점', sales: '76만원', items: 31, trend: 'up' },
              { store: '띵크어바웃 잠실점', sales: '68만원', items: 28, trend: 'same' }
            ].map((store, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{store.store}</p>
                  <p className="text-sm text-gray-600">{store.items}개 판매</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">{store.sales}</p>
                  {store.trend === 'up' && (
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  )}
                  {store.trend === 'down' && (
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 카테고리별 판매 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">카테고리별 판매 현황</h3>
          </div>
          <div className="space-y-4">
            {[
              { category: '쵸바 시리즈', percent: 35, amount: '170만원', color: 'blue' },
              { category: '코튼푸드', percent: 28, amount: '136만원', color: 'green' },
              { category: '라이독', percent: 22, amount: '107만원', color: 'yellow' },
              { category: '코튼애니', percent: 15, amount: '73만원', color: 'purple' }
            ].map((category, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{category.category}</span>
                  <span className="text-sm text-gray-600">{category.amount}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`bg-${category.color}-500 h-2 rounded-full`} 
                    style={{ width: `${category.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 입고 현황 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">오늘 입고 현황</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">시간</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">매장</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">품목</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수량</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">09:00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">에이랜드 명동점</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">쵸바 키링 5종</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">200개</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    완료
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">11:00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">스파오 홍대점</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">코튼푸드 쿠션</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">50개</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    배송중
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">14:00</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">후아유 신촌점</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">라이독 인형</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">30개</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    예정
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}