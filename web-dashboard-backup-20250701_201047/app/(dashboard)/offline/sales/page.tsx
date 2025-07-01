'use client';

import { useState } from 'react';

export default function OfflineSalesPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">매출관리</h1>
          <p className="text-gray-600 mt-1">오프라인 매장 매출 현황을 확인하세요</p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            상세 분석
          </button>
        </div>
      </div>

      {/* 기간 선택 */}
      <div className="flex gap-2 bg-white p-4 rounded-lg shadow">
        {[
          { id: 'today', name: '오늘' },
          { id: 'yesterday', name: '어제' },
          { id: 'thisWeek', name: '이번주' },
          { id: 'thisMonth', name: '이번달' },
          { id: 'lastMonth', name: '지난달' },
          { id: 'custom', name: '기간선택' }
        ].map((period) => (
          <button
            key={period.id}
            onClick={() => setSelectedPeriod(period.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === period.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {period.name}
          </button>
        ))}
      </div>

      {/* 매출 요약 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 매출</p>
                <p className="text-2xl font-bold text-gray-900">15,234,000원</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  12% (전일 대비)
                </p>
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
                <p className="text-sm text-gray-600">판매 건수</p>
                <p className="text-2xl font-bold text-gray-900">287건</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  8% 증가
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">객단가</p>
                <p className="text-2xl font-bold text-gray-900">53,100원</p>
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  2% 감소
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">매출 목표</p>
                <p className="text-2xl font-bold text-gray-900">85.2%</p>
                <p className="text-xs text-gray-500 mt-1">목표: 18,000,000원</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 매장별 매출 현황 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">매장별 매출 현황</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">매장</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">매출액</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">판매건수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">객단가</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">전일대비</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">목표달성률</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">인기상품</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  name: '에이랜드 명동점',
                  sales: '4,234,000원',
                  count: 82,
                  avgPrice: '51,600원',
                  change: '+15%',
                  target: '92%',
                  popular: '쵸바 계란 키링'
                },
                {
                  name: '에이랜드 강남점',
                  sales: '5,123,000원',
                  count: 95,
                  avgPrice: '53,900원',
                  change: '+8%',
                  target: '88%',
                  popular: '코튼푸드 쌀알 쿠션'
                },
                {
                  name: '스파오 홍대점',
                  sales: '3,456,000원',
                  count: 68,
                  avgPrice: '50,800원',
                  change: '-5%',
                  target: '75%',
                  popular: '라이독 브라운 인형'
                },
                {
                  name: '띵크어바웃 잠실점',
                  sales: '1,234,000원',
                  count: 28,
                  avgPrice: '44,100원',
                  change: '+12%',
                  target: '82%',
                  popular: '쵸바 새우 볼체인토이'
                },
                {
                  name: '후아유 신촌점',
                  sales: '1,187,000원',
                  count: 14,
                  avgPrice: '84,800원',
                  change: '+25%',
                  target: '95%',
                  popular: '코튼푸드 복숭아 모찌방석'
                }
              ].map((store, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{store.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{store.sales}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{store.count}건</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{store.avgPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${
                      store.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {store.change}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: store.target }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{store.target}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{store.popular}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">시간대별 매출</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[
                { time: '10:00-12:00', sales: 2340000, percentage: 15 },
                { time: '12:00-14:00', sales: 4560000, percentage: 30 },
                { time: '14:00-16:00', sales: 3890000, percentage: 26 },
                { time: '16:00-18:00', sales: 2890000, percentage: 19 },
                { time: '18:00-20:00', sales: 1554000, percentage: 10 }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{item.time}</span>
                    <span className="text-sm font-medium">{item.sales.toLocaleString()}원 ({item.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${item.percentage * 3.3}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">카테고리별 매출</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[
                { category: '키링', sales: 4567000, percentage: 30, color: 'bg-blue-500' },
                { category: '쿠션', sales: 3890000, percentage: 25, color: 'bg-green-500' },
                { category: '인형', sales: 3456000, percentage: 23, color: 'bg-purple-500' },
                { category: '볼체인토이', sales: 2234000, percentage: 15, color: 'bg-yellow-500' },
                { category: '기타', sales: 1087000, percentage: 7, color: 'bg-gray-500' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-gray-700">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{item.sales.toLocaleString()}원</div>
                    <div className="text-xs text-gray-500">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">총 매출</span>
                <span className="text-sm font-bold text-gray-900">15,234,000원</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 베스트 상품 */}
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <h3 className="card-title">베스트 상품 TOP 10</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800">전체보기</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">순위</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상품명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">브랜드</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">판매수량</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">매출액</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">매출비중</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { rank: 1, name: '쵸바 계란 키링', brand: '쵸바', qty: 156, sales: 1248000, ratio: 8.2 },
                { rank: 2, name: '코튼푸드 쌀알 쿠션', brand: '코튼푸드', qty: 87, sales: 3045000, ratio: 20.0 },
                { rank: 3, name: '라이독 브라운 인형', brand: '코튼애니', qty: 62, sales: 1736000, ratio: 11.4 },
                { rank: 4, name: '쵸바 새우 볼체인토이', brand: '쵸바', qty: 134, sales: 1608000, ratio: 10.6 },
                { rank: 5, name: '코튼푸드 복숭아 모찌방석', brand: '코튼푸드', qty: 45, sales: 1890000, ratio: 12.4 }
              ].map((product) => (
                <tr key={product.rank} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      product.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {product.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.qty}개</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.sales.toLocaleString()}원</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.ratio}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}