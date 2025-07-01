'use client';

import { useState } from 'react';

export default function OnlinePage() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">온라인사업 대시보드</h1>
          <p className="text-gray-600 mt-1">실시간 온라인 판매 현황을 확인하세요</p>
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
            <option value="all">전체 채널</option>
            <option value="naver">네이버 스토어</option>
            <option value="coupang">쿠팡</option>
            <option value="mall">자사몰</option>
            <option value="ssg">SSG</option>
          </select>
          <button className="btn btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            새로고침
          </button>
        </div>
      </div>

      {/* 핵심 지표 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">오늘 매출</p>
                <p className="text-2xl font-bold text-gray-900">8,234,000원</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  15% (전일 대비)
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
                <p className="text-sm text-gray-600">주문 건수</p>
                <p className="text-2xl font-bold text-gray-900">156건</p>
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
                <p className="text-sm text-gray-600">방문자수</p>
                <p className="text-2xl font-bold text-gray-900">2,345명</p>
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  3% 감소
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <p className="text-sm text-gray-600">전환율</p>
                <p className="text-2xl font-bold text-gray-900">6.65%</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  0.8% 개선
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 실시간 주문 현황 및 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card">
          <div className="card-header">
            <h3 className="card-title">시간대별 매출 현황</h3>
          </div>
          <div className="card-body">
            <div className="h-64 flex items-end gap-2">
              {[
                { time: '09시', sales: 450000 },
                { time: '10시', sales: 620000 },
                { time: '11시', sales: 890000 },
                { time: '12시', sales: 1250000 },
                { time: '13시', sales: 980000 },
                { time: '14시', sales: 1150000 },
                { time: '15시', sales: 1450000 },
                { time: '16시', sales: 1320000 },
                { time: '17시', sales: 980000 },
                { time: '18시', sales: 780000 }
              ].map((item, idx) => (
                <div key={idx} className="flex-1">
                  <div className="relative h-full flex flex-col justify-end">
                    <div 
                      className="bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer relative group"
                      style={{ height: `${(item.sales / 1450000) * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.sales.toLocaleString()}원
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 text-center mt-2">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">실시간 주문</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {[
                { time: '방금 전', product: '쵸바 계란 키링', channel: '네이버', amount: 24000 },
                { time: '1분 전', product: '코튼푸드 쌀알 쿠션', channel: '쿠팡', amount: 35000 },
                { time: '3분 전', product: '라이독 브라운 인형', channel: '자사몰', amount: 28000 },
                { time: '5분 전', product: '쵸바 새우 볼체인토이', channel: 'SSG', amount: 12000 },
                { time: '8분 전', product: '코튼푸드 복숭아 모찌방석', channel: '네이버', amount: 42000 },
                { time: '12분 전', product: '리우 냥이 키링', channel: '쿠팡', amount: 8000 }
              ].map((order, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{order.product}</p>
                    <p className="text-xs text-gray-500">{order.time} · {order.channel}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{order.amount.toLocaleString()}원</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 채널별 성과 및 인기상품 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">채널별 매출 비중</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {[
                { channel: '네이버 스토어', sales: 3250000, ratio: 39.5, color: 'bg-green-500' },
                { channel: '쿠팡', sales: 2480000, ratio: 30.1, color: 'bg-yellow-500' },
                { channel: '자사몰', sales: 1560000, ratio: 18.9, color: 'bg-blue-500' },
                { channel: 'SSG', sales: 944000, ratio: 11.5, color: 'bg-purple-500' }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.channel}</span>
                    <span className="text-sm text-gray-900">{item.sales.toLocaleString()}원 ({item.ratio}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${item.ratio}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-gray-700">총 매출</span>
                <span className="text-sm font-bold text-gray-900">8,234,000원</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="card-title">인기 상품 TOP 10</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">전체보기</button>
          </div>
          <div className="card-body">
            <div className="space-y-2">
              {[
                { rank: 1, name: '쵸바 계란 키링', qty: 45, sales: 1080000 },
                { rank: 2, name: '코튼푸드 쌀알 쿠션', qty: 28, sales: 980000 },
                { rank: 3, name: '라이독 브라운 인형', qty: 32, sales: 896000 },
                { rank: 4, name: '쵸바 새우 볼체인토이', qty: 68, sales: 816000 },
                { rank: 5, name: '코튼푸드 복숭아 모찌방석', qty: 18, sales: 756000 },
                { rank: 6, name: '리우 냥이 키링', qty: 82, sales: 656000 },
                { rank: 7, name: '에스티베어 블루 바디필로우', qty: 12, sales: 588000 },
                { rank: 8, name: '쵸바 문어 스티커팩', qty: 125, sales: 500000 },
                { rank: 9, name: '코튼애니 토토 인형', qty: 22, sales: 484000 },
                { rank: 10, name: '코튼푸드 수박 쿠션', qty: 15, sales: 450000 }
              ].map((product) => (
                <div key={product.rank} className="flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2 -mx-2 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      product.rank <= 3 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {product.rank}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">판매 {product.qty}개</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{(product.sales / 1000).toFixed(0)}K</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 추가 지표 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">재고 현황</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-red-900">품절 임박</p>
                  <p className="text-xs text-red-700">5개 이하</p>
                </div>
                <span className="text-2xl font-bold text-red-600">8개</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-yellow-900">재고 부족</p>
                  <p className="text-xs text-yellow-700">20개 이하</p>
                </div>
                <span className="text-2xl font-bold text-yellow-600">15개</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-900">적정 재고</p>
                  <p className="text-xs text-green-700">20개 초과</p>
                </div>
                <span className="text-2xl font-bold text-green-600">142개</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">CS 현황</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">23</p>
                <p className="text-sm text-gray-600">미처리 문의</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">4.8</p>
                <p className="text-sm text-gray-600">평균 평점</p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">교환/반품</span>
                <span className="font-medium">5건</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">배송문의</span>
                <span className="font-medium">12건</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">상품문의</span>
                <span className="font-medium">6건</span>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">마케팅 성과</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">광고비 대비 매출(ROAS)</span>
                  <span className="text-sm font-medium">452%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">신규고객 비율</span>
                  <span className="text-sm font-medium">28%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-600">재구매율</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}