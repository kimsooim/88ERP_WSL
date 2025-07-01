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
      {/* Aland 스타일 헤더 - 블루 배경 */}
      <header className="header-aland">
        <div className="h-16 px-8 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/images/88_logo.png" 
                alt="88 Logo" 
                className="h-10 w-auto brightness-0 invert"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-xl text-white leading-none">ERP</span>
                <span className="text-[10px] text-blue-100 font-normal -mt-1">Enterprise System</span>
              </div>
            </div>
            
            {/* Main Navigation */}
            <nav className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedTeam('brand')}
                className={`nav-item-aland ${
                  selectedTeam === 'brand' 
                    ? 'nav-item-aland-active' 
                    : 'nav-item-aland-inactive'
                }`}
              >
                브랜드팀
              </button>
              <button 
                onClick={() => setSelectedTeam('toy')}
                className={`nav-item-aland ${
                  selectedTeam === 'toy' 
                    ? 'nav-item-aland-active' 
                    : 'nav-item-aland-inactive'
                }`}
              >
                완구팀
              </button>
              <button 
                onClick={() => setSelectedTeam('strategy')}
                className={`nav-item-aland ${
                  selectedTeam === 'strategy' 
                    ? 'nav-item-aland-active' 
                    : 'nav-item-aland-inactive'
                }`}
              >
                전략팀
              </button>
              <div className="w-px h-6 bg-blue-300 mx-2 opacity-30"></div>
              <button className="nav-item-aland nav-item-aland-inactive">
                전자결재
              </button>
              <button className="nav-item-aland nav-item-aland-inactive">
                판매일보
              </button>
            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <span className="text-sm text-blue-100 font-normal">2025년 6월 30일 오후 4:30</span>
            <div className="flex items-center gap-4">
              <button className="text-white hover:bg-white/10 p-2 rounded-md transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <button className="text-white hover:bg-white/10 p-2 rounded-md transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <div className="flex items-center gap-3 pl-4 border-l border-blue-300/30">
                <div className="text-right">
                  <p className="text-sm font-bold text-white">Ann</p>
                  <p className="text-xs text-blue-100 font-normal">관리자</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar */}
        <aside className="sidebar-aland w-64">
          <div className="p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{teams[selectedTeam].name}</h2>
            <nav className="space-y-1">
              {teams[selectedTeam].menus.map((menu, index) => (
                <button
                  key={index}
                  className={`sidebar-item-aland ${
                    index === 0 ? 'sidebar-item-aland-active' : ''
                  }`}
                >
                  {menu}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-8">
            {/* Page Title */}
            <div className="mb-8 animate-fadeIn">
              <h1 className="text-2xl font-extrabold text-gray-900">대시보드</h1>
              <p className="text-gray-600 mt-1 font-normal">오늘의 비즈니스 현황을 한눈에 확인하세요</p>
            </div>

            {/* KPI Cards - Aland Style */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="stat-card-aland animate-fadeIn" style={{animationDelay: '0.1s'}}>
                <div className="flex items-center justify-between mb-4">
                  <span className="stat-label">오늘 매출</span>
                  <span className="text-xs font-bold text-green-600">+12.5%</span>
                </div>
                <p className="stat-value">₩4,250,000</p>
                <p className="text-xs text-gray-500 mt-2 font-normal">전일 대비 ₩450,000 증가</p>
              </div>

              <div className="stat-card-aland animate-fadeIn" style={{animationDelay: '0.2s'}}>
                <div className="flex items-center justify-between mb-4">
                  <span className="stat-label">신규 주문</span>
                  <span className="badge-aland badge-aland-primary">진행중</span>
                </div>
                <p className="stat-value">32건</p>
                <p className="text-xs text-gray-500 mt-2 font-normal">처리 대기 5건</p>
              </div>

              <div className="stat-card-aland animate-fadeIn" style={{animationDelay: '0.3s'}}>
                <div className="flex items-center justify-between mb-4">
                  <span className="stat-label">재고 회전율</span>
                  <span className="badge-aland badge-aland-warning">주의</span>
                </div>
                <p className="stat-value">2.3회</p>
                <p className="text-xs text-gray-500 mt-2 font-normal">목표 대비 -0.7회</p>
              </div>

              <div className="stat-card-aland animate-fadeIn" style={{animationDelay: '0.4s'}}>
                <div className="flex items-center justify-between mb-4">
                  <span className="stat-label">고객 만족도</span>
                  <span className="badge-aland badge-aland-success">우수</span>
                </div>
                <p className="stat-value">4.8점</p>
                <p className="text-xs text-gray-500 mt-2 font-normal">이번 달 평균</p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {/* Bar Chart */}
              <div className="col-span-2 card-aland">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900">매출 추이</h3>
                  <select className="text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 font-normal focus:outline-none focus:border-blue-500">
                    <option>최근 7일</option>
                    <option>최근 30일</option>
                    <option>최근 90일</option>
                  </select>
                </div>
                <div className="chart-container h-64 flex items-center justify-center">
                  <span className="text-gray-400 font-normal">차트 영역</span>
                </div>
              </div>

              {/* Donut Chart */}
              <div className="card-aland">
                <h3 className="font-bold text-gray-900 mb-6">카테고리별 매출</h3>
                <div className="chart-container h-64 flex items-center justify-center">
                  <span className="text-gray-400 font-normal">도넛 차트</span>
                </div>
              </div>
            </div>

            {/* Data Table */}
            <div className="card-aland">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900">최근 주문 내역</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-bold">
                  전체보기 →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="table-aland">
                  <thead>
                    <tr>
                      <th>주문번호</th>
                      <th>고객명</th>
                      <th>상품</th>
                      <th>금액</th>
                      <th>상태</th>
                      <th>작업</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-normal">#20250630-001</td>
                      <td className="font-normal">롯데백화점</td>
                      <td className="font-normal">코튼푸드 키링 외 2건</td>
                      <td className="font-bold">₩1,250,000</td>
                      <td>
                        <span className="badge-aland badge-aland-success">
                          배송완료
                        </span>
                      </td>
                      <td>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-normal">상세</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="font-normal">#20250630-002</td>
                      <td className="font-normal">교보문고</td>
                      <td className="font-normal">쵸바 볼체인 100개</td>
                      <td className="font-bold">₩850,000</td>
                      <td>
                        <span className="badge-aland badge-aland-primary">
                          생산중
                        </span>
                      </td>
                      <td>
                        <button className="text-sm text-blue-600 hover:text-blue-700 font-normal">상세</button>
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