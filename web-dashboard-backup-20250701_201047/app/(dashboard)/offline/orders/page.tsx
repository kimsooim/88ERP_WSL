'use client';

import { useState } from 'react';

export default function OfflineOrdersPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">주문관리</h1>
          <p className="text-gray-600 mt-1">오프라인 매장 주문을 관리하세요</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            엑셀 다운로드
          </button>
          <button className="btn btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            주문 등록
          </button>
        </div>
      </div>

      {/* 상태별 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card border-l-4 border-blue-500 cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => setSelectedFilter('all')}>
          <div className="card-body">
            <p className="text-sm text-gray-600">전체 주문</p>
            <p className="text-2xl font-bold text-gray-900">142</p>
            <p className="text-xs text-gray-500 mt-1">오늘 +12건</p>
          </div>
        </div>
        <div className="card border-l-4 border-yellow-500 cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => setSelectedFilter('preparing')}>
          <div className="card-body">
            <p className="text-sm text-gray-600">준비중</p>
            <p className="text-2xl font-bold text-gray-900">23</p>
            <p className="text-xs text-gray-500 mt-1">긴급 5건</p>
          </div>
        </div>
        <div className="card border-l-4 border-green-500 cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => setSelectedFilter('completed')}>
          <div className="card-body">
            <p className="text-sm text-gray-600">완료</p>
            <p className="text-2xl font-bold text-gray-900">108</p>
            <p className="text-xs text-gray-500 mt-1">오늘 +8건</p>
          </div>
        </div>
        <div className="card border-l-4 border-red-500 cursor-pointer hover:shadow-md transition-shadow"
             onClick={() => setSelectedFilter('cancelled')}>
          <div className="card-body">
            <p className="text-sm text-gray-600">취소</p>
            <p className="text-2xl font-bold text-gray-900">11</p>
            <p className="text-xs text-gray-500 mt-1">이번주 3건</p>
          </div>
        </div>
      </div>

      {/* 필터 및 검색 */}
      <div className="card">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">기간</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="today">오늘</option>
                <option value="week">이번주</option>
                <option value="month">이번달</option>
                <option value="custom">직접선택</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">매장</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">전체 매장</option>
                <option value="aland_myeongdong">에이랜드 명동점</option>
                <option value="aland_gangnam">에이랜드 강남점</option>
                <option value="spao_hongdae">스파오 홍대점</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">전체 상태</option>
                <option value="pending">대기중</option>
                <option value="preparing">준비중</option>
                <option value="completed">완료</option>
                <option value="cancelled">취소</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">검색</label>
              <input 
                type="text" 
                placeholder="주문번호, 고객명..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 주문 목록 */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주문번호</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">일시</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">매장</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상품</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  id: 'OFF-2025-0701-001',
                  date: '2025-07-01 10:30',
                  store: '에이랜드 명동점',
                  items: '쵸바 키링 외 2건',
                  amount: '45,000원',
                  status: 'preparing',
                  customer: '김민수'
                },
                {
                  id: 'OFF-2025-0701-002',
                  date: '2025-07-01 09:15',
                  store: '스파오 홍대점',
                  items: '코튼푸드 쿠션',
                  amount: '35,000원',
                  status: 'completed',
                  customer: '이서연'
                },
                {
                  id: 'OFF-2025-0630-089',
                  date: '2025-06-30 18:45',
                  store: '에이랜드 강남점',
                  items: '라이독 인형 외 1건',
                  amount: '56,000원',
                  status: 'completed',
                  customer: '박지은'
                },
                {
                  id: 'OFF-2025-0630-088',
                  date: '2025-06-30 17:20',
                  store: '후아유 신촌점',
                  items: '쵸바 볼체인토이 3개',
                  amount: '36,000원',
                  status: 'cancelled',
                  customer: '최준호'
                },
                {
                  id: 'OFF-2025-0630-087',
                  date: '2025-06-30 16:10',
                  store: '띵크어바웃 잠실점',
                  items: '코튼푸드 모찌방석',
                  amount: '42,000원',
                  status: 'preparing',
                  customer: '정하늘'
                }
              ].map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                    <div className="text-xs text-gray-500">{order.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.store}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.status === 'preparing' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        준비중
                      </span>
                    )}
                    {order.status === 'completed' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        완료
                      </span>
                    )}
                    {order.status === 'cancelled' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        취소
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">상세</button>
                    <button className="text-gray-600 hover:text-gray-900">인쇄</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            총 <span className="font-medium">142</span>개 중 <span className="font-medium">1-5</span> 표시
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-50">이전</button>
            <button className="px-3 py-1 border rounded bg-blue-500 text-white">1</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border rounded hover:bg-gray-50">다음</button>
          </div>
        </div>
      </div>
    </div>
  );
}