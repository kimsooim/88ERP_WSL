'use client';

import { useState } from 'react';

export default function Home() {
  const [selectedTeam, setSelectedTeam] = useState('brand');
  
  const teams = {
    brand: {
      name: '브랜드팀',
      menus: ['상품관리', '고객관리', '채널관리', '주문관리', '구매관리', '매출관리']
    },
    toy: {
      name: '완구팀',
      menus: ['상품관리', '견적서', '샘플관리', '구매관리', '고객관리', '매출관리']
    },
    strategy: {
      name: '전략팀',
      menus: ['비용관리', '카드관리', '은행관리', '손익계산서']
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-100">
        <div className="h-16 px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">88</span>
              </div>
              <span className="font-bold text-gray-900">ERP</span>
            </div>
            
            {/* Main Navigation */}
            <nav className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedTeam('brand')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedTeam === 'brand' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                브랜드팀
              </button>
              <button 
                onClick={() => setSelectedTeam('toy')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedTeam === 'toy' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                완구팀
              </button>
              <button 
                onClick={() => setSelectedTeam('strategy')}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedTeam === 'strategy' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                전략팀
              </button>
              <div className="w-px h-6 bg-gray-200 mx-2"></div>
              <button className="px-4 py-2 rounded-lg font-medium text-sm text-gray-600 hover:bg-gray-50 transition-all">
                전자결재
              </button>
              <button className="px-4 py-2 rounded-lg font-medium text-sm text-gray-600 hover:bg-gray-50 transition-all">
                판매일보
              </button>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <span className="text-sm text-gray-500">2025년 6월 30일 오후 4:15</span>
            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:bg-gray-50 p-2 rounded-lg transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="text-gray-600 hover:bg-gray-50 p-2 rounded-lg transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Ann</p>
                  <p className="text-xs text-gray-500">관리자</p>
                </div>
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-100">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{teams[selectedTeam].name}</h2>
            <nav className="space-y-1">
              {teams[selectedTeam].menus.map((menu, index) => (
                <button
                  key={index}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium text-sm transition-all ${
                    index === 0 
                      ? 'bg-gray-900 text-white' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {menu}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
              <p className="text-gray-500 mt-1">오늘의 비즈니스 현황을 한눈에 확인하세요</p>
            </div>

            {/* KPI Cards - Toss Style */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">오늘 매출</span>
                  <span className="text-xs text-green-600 font-medium">+12.5%</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">₩4,250,000</p>
                <p className="text-xs text-gray-500 mt-2">전일 대비 ₩450,000 증가</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">신규 주문</span>
                  <span className="text-xs text-blue-600 font-medium">진행중</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">32건</p>
                <p className="text-xs text-gray-500 mt-2">처리 대기 5건</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">재고 회전율</span>
                  <span className="text-xs text-orange-600 font-medium">주의</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">2.3회</p>
                <p className="text-xs text-gray-500 mt-2">목표 대비 -0.7회</p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">고객 만족도</span>
                  <span className="text-xs text-green-600 font-medium">우수</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">4.8점</p>
                <p className="text-xs text-gray-500 mt-2">이번 달 평균</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Bar Chart */}
              <div className="col-span-2 bg-white p-6 rounded-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900">매출 추이</h3>
                  <select className="text-sm text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-gray-300">
                    <option>최근 7일</option>
                    <option>최근 30일</option>
                    <option>최근 90일</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <span className="text-gray-400">차트 영역</span>
                </div>
              </div>

              {/* Donut Chart */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-6">카테고리별 매출</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <span className="text-gray-400">도넛 차트</span>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="bg-white rounded-2xl border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">최근 주문 내역</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    전체보기
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left p-4 font-medium text-sm text-gray-500">주문번호</th>
                      <th className="text-left p-4 font-medium text-sm text-gray-500">고객명</th>
                      <th className="text-left p-4 font-medium text-sm text-gray-500">상품</th>
                      <th className="text-left p-4 font-medium text-sm text-gray-500">금액</th>
                      <th className="text-left p-4 font-medium text-sm text-gray-500">상태</th>
                      <th className="text-left p-4 font-medium text-sm text-gray-500">작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-900">#20250630-001</td>
                      <td className="p-4 text-sm text-gray-900">롯데백화점</td>
                      <td className="p-4 text-sm text-gray-900">코튼푸드 키링 외 2건</td>
                      <td className="p-4 text-sm text-gray-900">₩1,250,000</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          배송완료
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="text-sm text-gray-600 hover:text-gray-900">상세</button>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="p-4 text-sm text-gray-900">#20250630-002</td>
                      <td className="p-4 text-sm text-gray-900">교보문고</td>
                      <td className="p-4 text-sm text-gray-900">쵸바 볼체인 100개</td>
                      <td className="p-4 text-sm text-gray-900">₩850,000</td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          생산중
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="text-sm text-gray-600 hover:text-gray-900">상세</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}