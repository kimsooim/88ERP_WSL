'use client';

import { useState } from 'react';

export default function OfflinePurchasesPage() {
  const [selectedTab, setSelectedTab] = useState('pending');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">구매관리</h1>
          <p className="text-gray-600 mt-1">오프라인 매장 재고 구매를 관리하세요</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            발주서 양식
          </button>
          <button className="btn btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            신규 발주
          </button>
        </div>
      </div>

      {/* 구매 현황 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">이번달 구매액</p>
                <p className="text-2xl font-bold text-gray-900">12,450,000원</p>
                <p className="text-xs text-gray-500 mt-1">전월 대비 -15%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">대기중 발주</p>
                <p className="text-2xl font-bold text-gray-900">8건</p>
                <p className="text-xs text-yellow-600 mt-1">승인 필요</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">진행중 발주</p>
                <p className="text-2xl font-bold text-gray-900">15건</p>
                <p className="text-xs text-blue-600 mt-1">평균 3일 소요</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">이번달 입고</p>
                <p className="text-2xl font-bold text-gray-900">42건</p>
                <p className="text-xs text-green-600 mt-1">완료</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 메뉴 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'pending', name: '대기중', count: 8 },
            { id: 'approved', name: '승인됨', count: 15 },
            { id: 'shipping', name: '배송중', count: 12 },
            { id: 'completed', name: '완료', count: 42 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
              <span className="ml-2 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* 필터 영역 */}
      <div className="card">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">기간</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="this_month">이번달</option>
                <option value="last_month">지난달</option>
                <option value="last_3months">최근 3개월</option>
                <option value="custom">직접선택</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">거래처</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">전체 거래처</option>
                <option value="supplier1">코튼프렌즈</option>
                <option value="supplier2">토이파크</option>
                <option value="supplier3">캐릭터월드</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">품목</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">전체 품목</option>
                <option value="keyring">키링</option>
                <option value="cushion">쿠션</option>
                <option value="doll">인형</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">검색</label>
              <input 
                type="text" 
                placeholder="발주번호, 상품명..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 발주 목록 */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">발주번호</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">발주일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">거래처</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">품목</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">금액</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  id: 'PO-2025-0701-001',
                  date: '2025-07-01',
                  supplier: '코튼프렌즈',
                  items: '쵸바 키링 외 5종',
                  amount: '2,450,000원',
                  status: 'pending',
                  dueDate: '2025-07-05'
                },
                {
                  id: 'PO-2025-0630-089',
                  date: '2025-06-30',
                  supplier: '토이파크',
                  items: '코튼푸드 쿠션 3종',
                  amount: '3,200,000원',
                  status: 'approved',
                  dueDate: '2025-07-03'
                },
                {
                  id: 'PO-2025-0629-078',
                  date: '2025-06-29',
                  supplier: '캐릭터월드',
                  items: '라이독 인형 세트',
                  amount: '1,890,000원',
                  status: 'shipping',
                  dueDate: '2025-07-02'
                },
                {
                  id: 'PO-2025-0628-067',
                  date: '2025-06-28',
                  supplier: '코튼프렌즈',
                  items: '쵸바 볼체인토이',
                  amount: '980,000원',
                  status: 'completed',
                  dueDate: '2025-06-30'
                },
                {
                  id: 'PO-2025-0627-056',
                  date: '2025-06-27',
                  supplier: '토이파크',
                  items: '코튼푸드 모찌방석',
                  amount: '1,560,000원',
                  status: 'completed',
                  dueDate: '2025-06-29'
                }
              ].map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.supplier}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.status === 'pending' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        대기중
                      </span>
                    )}
                    {order.status === 'approved' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        승인됨
                      </span>
                    )}
                    {order.status === 'shipping' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        배송중
                      </span>
                    )}
                    {order.status === 'completed' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        완료
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">상세</button>
                    {order.status === 'pending' && (
                      <button className="text-green-600 hover:text-green-900">승인</button>
                    )}
                    {order.status === 'shipping' && (
                      <button className="text-purple-600 hover:text-purple-900">추적</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            총 <span className="font-medium">77</span>건 중 <span className="font-medium">1-5</span> 표시
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

      {/* 재고 현황 및 발주 추천 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">재고 부족 알림</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[
                { name: '쵸바 계란 키링', current: 12, min: 50, store: '명동점' },
                { name: '코튼푸드 쌀알 쿠션', current: 3, min: 20, store: '강남점' },
                { name: '라이독 브라운 인형', current: 0, min: 30, store: '홍대점' },
                { name: '쵸바 새우 볼체인토이', current: 8, min: 40, store: '명동점' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.store} - 현재 {item.current}개 (최소 {item.min}개)</p>
                  </div>
                  <button className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    발주하기
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">월별 구매 추이</h3>
          </div>
          <div className="card-body">
            <div className="h-64 flex items-center justify-center text-gray-400">
              차트 영역 (월별 구매액 라인차트)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}