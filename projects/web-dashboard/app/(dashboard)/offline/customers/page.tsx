'use client';

import { useState } from 'react';

export default function OfflineCustomersPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">고객관리</h1>
          <p className="text-gray-600 mt-1">오프라인 매장 고객 정보를 관리하세요</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            가져오기
          </button>
          <button className="btn btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            고객 추가
          </button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">전체 고객</p>
                <p className="text-2xl font-bold text-gray-900">3,456</p>
                <p className="text-xs text-gray-500 mt-1">이번달 +234명</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">VIP 고객</p>
                <p className="text-2xl font-bold text-gray-900">285</p>
                <p className="text-xs text-green-600 mt-1">전체 8.2%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">재구매율</p>
                <p className="text-2xl font-bold text-gray-900">42.3%</p>
                <p className="text-xs text-green-600 mt-1">+3.5% 상승</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">평균 구매액</p>
                <p className="text-2xl font-bold text-gray-900">68,500원</p>
                <p className="text-xs text-blue-600 mt-1">전년 대비 +12%</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 필터 및 검색 */}
      <div className="card">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">등급</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
              >
                <option value="all">전체 등급</option>
                <option value="vip">VIP</option>
                <option value="gold">GOLD</option>
                <option value="silver">SILVER</option>
                <option value="bronze">BRONZE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">가입일</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">전체 기간</option>
                <option value="this_month">이번달</option>
                <option value="last_3months">최근 3개월</option>
                <option value="last_6months">최근 6개월</option>
                <option value="this_year">올해</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">구매횟수</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                <option value="">전체</option>
                <option value="1">1회</option>
                <option value="2-5">2-5회</option>
                <option value="6-10">6-10회</option>
                <option value="10+">10회 이상</option>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">검색</label>
              <input 
                type="text" 
                placeholder="이름, 전화번호, 이메일..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 고객 목록 */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">고객정보</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등급</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">구매정보</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">최근구매</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">주요매장</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  id: 1,
                  name: '김민서',
                  phone: '010-1234-5678',
                  email: 'minsu@email.com',
                  grade: 'vip',
                  totalPurchase: '3,245,000원',
                  purchaseCount: 42,
                  lastPurchase: '2일 전',
                  mainStore: '에이랜드 명동점',
                  joinDate: '2023-03-15'
                },
                {
                  id: 2,
                  name: '이지은',
                  phone: '010-2345-6789',
                  email: 'jieun@email.com',
                  grade: 'gold',
                  totalPurchase: '1,856,000원',
                  purchaseCount: 28,
                  lastPurchase: '1주 전',
                  mainStore: '스파오 홍대점',
                  joinDate: '2023-08-22'
                },
                {
                  id: 3,
                  name: '박서준',
                  phone: '010-3456-7890',
                  email: 'seojun@email.com',
                  grade: 'vip',
                  totalPurchase: '4,123,000원',
                  purchaseCount: 56,
                  lastPurchase: '오늘',
                  mainStore: '에이랜드 강남점',
                  joinDate: '2022-12-01'
                },
                {
                  id: 4,
                  name: '최하나',
                  phone: '010-4567-8901',
                  email: 'hana@email.com',
                  grade: 'silver',
                  totalPurchase: '567,000원',
                  purchaseCount: 12,
                  lastPurchase: '2주 전',
                  mainStore: '띵크어바웃 잠실점',
                  joinDate: '2024-02-15'
                },
                {
                  id: 5,
                  name: '정유진',
                  phone: '010-5678-9012',
                  email: 'yujin@email.com',
                  grade: 'bronze',
                  totalPurchase: '234,000원',
                  purchaseCount: 5,
                  lastPurchase: '1개월 전',
                  mainStore: '후아유 신촌점',
                  joinDate: '2024-06-10'
                }
              ].map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-xs text-gray-500">{customer.phone}</div>
                      <div className="text-xs text-gray-500">{customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {customer.grade === 'vip' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                        VIP
                      </span>
                    )}
                    {customer.grade === 'gold' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        GOLD
                      </span>
                    )}
                    {customer.grade === 'silver' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-200 text-gray-800">
                        SILVER
                      </span>
                    )}
                    {customer.grade === 'bronze' && (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800">
                        BRONZE
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{customer.totalPurchase}</div>
                      <div className="text-xs text-gray-500">{customer.purchaseCount}회 구매</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.lastPurchase}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.mainStore}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">상세</button>
                    <button className="text-gray-600 hover:text-gray-900">메모</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            총 <span className="font-medium">3,456</span>명 중 <span className="font-medium">1-5</span> 표시
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

      {/* 고객 세그먼트 분석 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">등급별 분포</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">VIP</span>
                  <span className="text-sm font-medium">285명 (8.2%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '8.2%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">GOLD</span>
                  <span className="text-sm font-medium">623명 (18.0%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">SILVER</span>
                  <span className="text-sm font-medium">1,234명 (35.7%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-500 h-2 rounded-full" style={{ width: '35.7%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">BRONZE</span>
                  <span className="text-sm font-medium">1,314명 (38.1%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '38.1%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">선호 상품 카테고리</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[
                { category: '쵸바 시리즈', percentage: 42 },
                { category: '코튼푸드 시리즈', percentage: 31 },
                { category: '코튼애니 시리즈', percentage: 27 }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{item.category}</span>
                    <span className="text-sm font-medium">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-green-500' : 'bg-purple-500'
                      }`} 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}