'use client';

import { useState } from 'react';

export default function OnlineAdvertisingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedChannel, setSelectedChannel] = useState('all');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">광고관리</h1>
          <p className="text-gray-600 mt-1">온라인 광고 캠페인을 관리하고 성과를 분석하세요</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            성과 리포트
          </button>
          <button className="btn btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            캠페인 생성
          </button>
        </div>
      </div>

      {/* 기간 및 채널 선택 */}
      <div className="flex gap-4 items-center">
        <div className="flex gap-2 bg-white p-4 rounded-lg shadow flex-1">
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
        <select 
          value={selectedChannel}
          onChange={(e) => setSelectedChannel(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="all">전체 채널</option>
          <option value="naver">네이버 광고</option>
          <option value="kakao">카카오 광고</option>
          <option value="google">구글 광고</option>
          <option value="facebook">페이스북/인스타그램</option>
        </select>
      </div>

      {/* 광고 성과 요약 */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">광고비용</p>
                <p className="text-2xl font-bold text-gray-900">1,234,500원</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  8% (전일 대비)
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
                <p className="text-sm text-gray-600">광고 매출</p>
                <p className="text-2xl font-bold text-gray-900">5,567,000원</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  15% 증가
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">ROAS</p>
                <p className="text-2xl font-bold text-gray-900">452%</p>
                <p className="text-xs text-green-600 mt-1">매우 우수</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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
                <p className="text-2xl font-bold text-gray-900">3.8%</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  0.5% 개선
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">노출수</p>
                <p className="text-2xl font-bold text-gray-900">342K</p>
                <p className="text-xs text-blue-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  12% 증가
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 활성 캠페인 목록 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">활성 캠페인</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">캠페인명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">채널</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">일 예산</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">오늘 소진</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">클릭수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">전환수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPC</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROAS</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  name: '쵸바 키링 검색광고',
                  channel: '네이버',
                  status: 'active',
                  budget: 100000,
                  spent: 78500,
                  clicks: 245,
                  conversions: 12,
                  cpc: 320,
                  roas: 580
                },
                {
                  name: '코튼푸드 쿠션 쇼핑광고',
                  channel: '네이버',
                  status: 'active',
                  budget: 150000,
                  spent: 123400,
                  clicks: 456,
                  conversions: 28,
                  cpc: 270,
                  roas: 720
                },
                {
                  name: '라이독 브랜드 검색',
                  channel: '구글',
                  status: 'active',
                  budget: 80000,
                  spent: 65200,
                  clicks: 189,
                  conversions: 8,
                  cpc: 345,
                  roas: 420
                },
                {
                  name: '여름 쿠션 프로모션',
                  channel: '카카오',
                  status: 'paused',
                  budget: 120000,
                  spent: 0,
                  clicks: 0,
                  conversions: 0,
                  cpc: 0,
                  roas: 0
                },
                {
                  name: '신상품 인스타 광고',
                  channel: '페이스북',
                  status: 'active',
                  budget: 200000,
                  spent: 156700,
                  clicks: 892,
                  conversions: 35,
                  cpc: 176,
                  roas: 890
                },
                {
                  name: '쵸바 새우 동영상광고',
                  channel: '유튜브',
                  status: 'active',
                  budget: 100000,
                  spent: 87300,
                  clicks: 567,
                  conversions: 15,
                  cpc: 154,
                  roas: 650
                }
              ].map((campaign, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{campaign.channel}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {campaign.status === 'active' ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        활성
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        일시정지
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {campaign.budget.toLocaleString()}원
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.spent.toLocaleString()}원</div>
                    <div className="text-xs text-gray-500">{((campaign.spent / campaign.budget) * 100).toFixed(0)}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.clicks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.conversions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.cpc}원</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${campaign.roas >= 500 ? 'text-green-600' : campaign.roas >= 300 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {campaign.roas}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">편집</button>
                    <button className="text-gray-600 hover:text-gray-900">
                      {campaign.status === 'active' ? '일시정지' : '재개'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 채널별 성과 및 상품별 광고 성과 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">채널별 성과</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {[
                { channel: '네이버', cost: 580000, revenue: 3250000, roas: 560, color: 'bg-green-500' },
                { channel: '구글', cost: 280000, revenue: 1180000, roas: 421, color: 'bg-blue-500' },
                { channel: '페이스북/인스타', cost: 450000, revenue: 2340000, roas: 520, color: 'bg-purple-500' },
                { channel: '카카오', cost: 120000, revenue: 456000, roas: 380, color: 'bg-yellow-500' },
                { channel: '유튜브', cost: 180000, revenue: 890000, roas: 494, color: 'bg-red-500' }
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.channel}</span>
                    <div className="text-right">
                      <span className="text-sm text-gray-900">{item.cost.toLocaleString()}원</span>
                      <span className="text-xs text-gray-500 ml-2">ROAS {item.roas}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`h-2 rounded-full ${item.color}`} style={{ width: `${(item.revenue / 3250000) * 100}%` }}></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">매출 {item.revenue.toLocaleString()}원</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <h3 className="card-title">상품별 광고 성과</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800">전체보기</button>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[
                { product: '쵸바 계란 키링', impressions: 45230, clicks: 890, conversions: 45, revenue: 1080000 },
                { product: '코튼푸드 쌀알 쿠션', impressions: 38900, clicks: 756, conversions: 32, revenue: 1120000 },
                { product: '라이독 브라운 인형', impressions: 32100, clicks: 623, conversions: 28, revenue: 784000 },
                { product: '쵸바 새우 볼체인토이', impressions: 28500, clicks: 512, conversions: 38, revenue: 456000 },
                { product: '코튼푸드 복숭아 모찌방석', impressions: 25600, clicks: 445, conversions: 18, revenue: 756000 }
              ].map((product, idx) => (
                <div key={idx} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{product.product}</h4>
                      <div className="flex gap-4 mt-1 text-xs text-gray-500">
                        <span>노출 {(product.impressions / 1000).toFixed(1)}K</span>
                        <span>클릭 {product.clicks}</span>
                        <span>전환 {product.conversions}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{product.revenue.toLocaleString()}원</p>
                      <p className="text-xs text-gray-500">전환율 {((product.conversions / product.clicks) * 100).toFixed(1)}%</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 광고 최적화 제안 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">최적화 제안</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">예산 재분배 추천</h4>
              </div>
              <p className="text-sm text-gray-600">
                페이스북/인스타 광고의 ROAS가 890%로 매우 높습니다. 
                예산을 20% 증액하면 월 매출 340만원 추가 예상됩니다.
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">적용하기 →</button>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">키워드 최적화 필요</h4>
              </div>
              <p className="text-sm text-gray-600">
                '라이독 브랜드 검색' 캠페인의 CPC가 345원으로 높습니다. 
                부정 키워드 추가로 비용 15% 절감 가능합니다.
              </p>
              <button className="text-sm text-yellow-600 hover:text-yellow-800 mt-2">검토하기 →</button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">시간대 최적화</h4>
              </div>
              <p className="text-sm text-gray-600">
                오후 2-4시 전환율이 5.2%로 가장 높습니다. 
                이 시간대 입찰가를 20% 상향하면 효율 개선 예상됩니다.
              </p>
              <button className="text-sm text-green-600 hover:text-green-800 mt-2">설정하기 →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}