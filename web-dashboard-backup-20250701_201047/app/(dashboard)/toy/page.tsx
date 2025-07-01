'use client';

export default function ToyPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600 mt-1">토이 사업 현황을 확인하세요</p>
      </div>
      
      {/* 상단 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-blue-50 border-blue-200">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-600">진행중 프로젝트</p>
                <p className="text-2xl font-bold text-blue-900">12</p>
              </div>
              <div className="text-blue-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-blue-600 mt-2">견적 단계 4건 포함</p>
          </div>
        </div>

        <div className="card bg-green-50 border-green-200">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-green-600">이번달 매출</p>
                <p className="text-2xl font-bold text-green-900">2.4억</p>
              </div>
              <div className="text-green-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-green-600 mt-2">전월 대비 +15%</p>
          </div>
        </div>

        <div className="card bg-yellow-50 border-yellow-200">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-yellow-600">대기중 샘플</p>
                <p className="text-2xl font-bold text-yellow-900">8</p>
              </div>
              <div className="text-yellow-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-yellow-600 mt-2">3건 제작중</p>
          </div>
        </div>

        <div className="card bg-purple-50 border-purple-200">
          <div className="card-body">
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm font-medium text-purple-600">생산 일정</p>
                <p className="text-2xl font-bold text-purple-900">5</p>
              </div>
              <div className="text-purple-500">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-purple-600 mt-2">이번주 2건</p>
          </div>
        </div>
      </div>

      {/* 중단 차트/리스트 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 고객사별 진행 현황 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">고객사별 진행 현황</h3>
          </div>
          <div className="space-y-4">
            {[
              { name: '삼성물산', projects: 3, status: '생산중', color: 'blue' },
              { name: '현대백화점', projects: 2, status: '견적대기', color: 'yellow' },
              { name: '롯데쇼핑', projects: 4, status: '샘플제작', color: 'green' },
              { name: '신세계', projects: 2, status: '계약검토', color: 'purple' },
              { name: 'CJ ENM', projects: 1, status: '완료예정', color: 'indigo' }
            ].map((client, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{client.name}</p>
                  <p className="text-sm text-gray-600">{client.projects}개 프로젝트</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full bg-${client.color}-100 text-${client.color}-700`}>
                  {client.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 최근 견적 요청 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">최근 견적 요청</h3>
          </div>
          <div className="space-y-3">
            {[
              { date: '2025-06-30', client: '이마트', product: '쵸바 키링 10종', amount: '50,000개' },
              { date: '2025-06-29', client: '교보문고', product: '코튼푸드 쿠션', amount: '3,000개' },
              { date: '2025-06-28', client: '다이소', product: '라이독 미니피규어', amount: '20,000개' },
              { date: '2025-06-27', client: '아트박스', product: '코튼애니 스티커팩', amount: '10,000개' }
            ].map((quote, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{quote.client}</p>
                    <p className="text-sm text-gray-600">{quote.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{quote.amount}</p>
                    <p className="text-xs text-gray-500">{quote.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 하단 생산 일정 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">이번주 생산 일정</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">날짜</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">고객사</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제품</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수량</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">07.01 (월)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">삼성물산</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">쵸바 볼체인토이</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">5,000개</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    생산중
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">07.03 (수)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">현대백화점</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">코튼푸드 낮잠쿠션</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2,000개</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    준비중
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