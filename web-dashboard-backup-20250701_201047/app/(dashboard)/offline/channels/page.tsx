'use client';

import { useState } from 'react';

export default function OfflineChannelsPage() {
  const [selectedTab, setSelectedTab] = useState('all');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">채널관리</h1>
          <p className="text-gray-600 mt-1">오프라인 매장 및 판매채널을 관리하세요</p>
        </div>
        <button className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          채널 추가
        </button>
      </div>

      {/* 채널 현황 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">전체 채널</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-xs text-gray-500 mt-1">활성 10개</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">에이랜드</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
                <p className="text-xs text-green-600 mt-1">매출 1위</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">A</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">스파오</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <p className="text-xs text-blue-600 mt-1">신규 2개</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 font-bold">S</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">기타</p>
                <p className="text-2xl font-bold text-gray-900">4</p>
                <p className="text-xs text-gray-500 mt-1">팝업 포함</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 필터 탭 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'all', name: '전체', count: 12 },
            { id: 'aland', name: '에이랜드', count: 5 },
            { id: 'spao', name: '스파오', count: 3 },
            { id: 'other', name: '기타', count: 4 }
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

      {/* 채널 리스트 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          {
            id: 1,
            name: '에이랜드 명동점',
            type: 'aland',
            address: '서울 중구 명동길 50',
            manager: '김민수',
            phone: '02-1234-5678',
            status: 'active',
            monthSales: '45,230,000원',
            lastOrder: '2시간 전',
            stockAlert: 3
          },
          {
            id: 2,
            name: '에이랜드 강남점',
            type: 'aland',
            address: '서울 강남구 강남대로 382',
            manager: '이서연',
            phone: '02-2345-6789',
            status: 'active',
            monthSales: '62,450,000원',
            lastOrder: '30분 전',
            stockAlert: 0
          },
          {
            id: 3,
            name: '스파오 홍대점',
            type: 'spao',
            address: '서울 마포구 양화로 152',
            manager: '박지은',
            phone: '02-3456-7890',
            status: 'active',
            monthSales: '38,900,000원',
            lastOrder: '1시간 전',
            stockAlert: 5
          },
          {
            id: 4,
            name: '후아유 신촌점',
            type: 'other',
            address: '서울 서대문구 신촌로 83',
            manager: '최준호',
            phone: '02-4567-8901',
            status: 'inactive',
            monthSales: '0원',
            lastOrder: '3일 전',
            stockAlert: 0
          },
          {
            id: 5,
            name: '띵크어바웃 잠실점',
            type: 'other',
            address: '서울 송파구 올림픽로 240',
            manager: '정하늘',
            phone: '02-5678-9012',
            status: 'active',
            monthSales: '25,670,000원',
            lastOrder: '5시간 전',
            stockAlert: 2
          },
          {
            id: 6,
            name: '에이랜드 부산점',
            type: 'aland',
            address: '부산 중구 남포대로 58',
            manager: '한소희',
            phone: '051-1234-5678',
            status: 'active',
            monthSales: '41,200,000원',
            lastOrder: '4시간 전',
            stockAlert: 1
          }
        ].map((channel) => (
          <div key={channel.id} className="card hover:shadow-lg transition-shadow cursor-pointer">
            <div className="card-body">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{channel.address}</p>
                </div>
                {channel.status === 'active' ? (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    운영중
                  </span>
                ) : (
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    일시중단
                  </span>
                )}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">담당자</span>
                  <span className="text-gray-900">{channel.manager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">연락처</span>
                  <span className="text-gray-900">{channel.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">이번달 매출</span>
                  <span className="font-medium text-gray-900">{channel.monthSales}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">최근 주문</span>
                  <span className="text-gray-900">{channel.lastOrder}</span>
                </div>
              </div>

              {channel.stockAlert > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center text-yellow-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-sm">재고부족 {channel.stockAlert}개 품목</span>
                  </div>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <button className="flex-1 btn btn-outline btn-sm">상세보기</button>
                <button className="flex-1 btn btn-primary btn-sm">재고현황</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 매출 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">채널별 월 매출 추이</h3>
          </div>
          <div className="card-body">
            <div className="h-64 flex items-center justify-center text-gray-400">
              차트 영역 (채널별 매출 라인차트)
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">인기 제품 TOP 5</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[
                { rank: 1, name: '쵸바 계란 키링', sales: '1,234개' },
                { rank: 2, name: '코튼푸드 쌀알 쿠션', sales: '856개' },
                { rank: 3, name: '라이독 브라운 인형', sales: '642개' },
                { rank: 4, name: '쵸바 새우 볼체인토이', sales: '589개' },
                { rank: 5, name: '코튼푸드 복숭아 모찌방석', sales: '412개' }
              ].map((item) => (
                <div key={item.rank} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                      {item.rank}
                    </span>
                    <span className="text-sm text-gray-900">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{item.sales}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}