'use client';

import { useState } from 'react';

export default function ToyAdvertisingPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('thisMonth');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedTab, setSelectedTab] = useState('overview');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">토이사업 광고관리</h1>
          <p className="text-gray-600 mt-1">구글 애즈와 네이버 파워링크 성과를 종합 관리하고 유입/전환율을 분석하세요</p>
        </div>
        <div className="flex gap-2">
          <button className="btn btn-outline">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            월별 리포트
          </button>
          <button className="btn btn-primary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            키워드 추가
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
          <option value="google">구글 검색광고</option>
          <option value="naver">네이버 파워링크</option>
        </select>
      </div>

      {/* 메인 탭 네비게이션 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button 
            onClick={() => setSelectedTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'overview' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            성과 개요
          </button>
          <button 
            onClick={() => setSelectedTab('keywords')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'keywords' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            키워드 관리
          </button>
          <button 
            onClick={() => setSelectedTab('conversion')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'conversion' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            유입/전환 분석
          </button>
          <button 
            onClick={() => setSelectedTab('budget')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              selectedTab === 'budget' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            예산 관리
          </button>
        </nav>
      </div>

      {/* 광고 성과 요약 KPI */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">총 노출수</p>
                <p className="text-2xl font-bold text-gray-900">485,230</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  18.5% 증가
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">클릭수</p>
                <p className="text-2xl font-bold text-gray-900">3,842</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  12.3% 증가
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CTR</p>
                <p className="text-2xl font-bold text-gray-900">0.79%</p>
                <p className="text-xs text-red-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  0.05% 감소
                </p>
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
                <p className="text-sm text-gray-600">평균 CPC</p>
                <p className="text-2xl font-bold text-gray-900">2,150원</p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  180원 감소
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <p className="text-sm text-gray-600">전환수</p>
                <p className="text-2xl font-bold text-gray-900">156건</p>
                <p className="text-xs text-blue-600 mt-1">전환율 4.06%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">광고비용</p>
                <p className="text-2xl font-bold text-gray-900">8,260,300원</p>
                <p className="text-xs text-gray-500 mt-1">CPL 52,950원</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      {selectedTab === 'overview' && (
        <>
          {/* 월별 광고 성과 트렌드 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">월별 광고 성과 추이</h3>
              </div>
              <div className="card-body">
                <div className="h-64 flex items-end gap-2">
                  {[
                    { month: '1월', impressions: 320450, clicks: 2890, cost: 6234000 },
                    { month: '2월', impressions: 358900, clicks: 3120, cost: 6890000 },
                    { month: '3월', impressions: 412300, clicks: 3450, cost: 7560000 },
                    { month: '4월', impressions: 398700, clicks: 3280, cost: 7120000 },
                    { month: '5월', impressions: 445600, clicks: 3680, cost: 7980000 },
                    { month: '6월', impressions: 485230, clicks: 3842, cost: 8260300 }
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1">
                      <div className="relative h-full flex justify-center gap-1">
                        <div 
                          className="w-2 bg-blue-400 rounded-t relative group cursor-pointer"
                          style={{ height: `${(item.impressions / 485230) * 100}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            노출 {(item.impressions / 1000).toFixed(0)}K
                          </div>
                        </div>
                        <div 
                          className="w-2 bg-green-500 rounded-t relative group cursor-pointer"
                          style={{ height: `${(item.clicks / 3842) * 100}%` }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            클릭 {item.clicks.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-600 text-center mt-1">{item.month}</div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-400 rounded"></div>
                    <span className="text-xs text-gray-600">노출수</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span className="text-xs text-gray-600">클릭수</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">업종별 문의 전환</h3>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  {[
                    { industry: '엔터테인먼트', inquiries: 45, rate: 28.8 },
                    { industry: '교육/출판', inquiries: 32, rate: 20.5 },
                    { industry: '유통/리테일', inquiries: 28, rate: 17.9 },
                    { industry: '제조업', inquiries: 23, rate: 14.7 },
                    { industry: '서비스업', inquiries: 18, rate: 11.5 },
                    { industry: '기타', inquiries: 10, rate: 6.4 }
                  ].map((item, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">{item.industry}</span>
                        <div className="text-right">
                          <span className="text-sm font-medium text-gray-900">{item.inquiries}건</span>
                          <span className="text-xs text-gray-500 ml-2">({item.rate}%)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.rate}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 구글 vs 네이버 상세 비교 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">구글 vs 네이버 광고 성과 상세 비교</h3>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 구글 광고 성과 */}
                <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">G</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">구글 검색광고</h4>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">비용 45.2%</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">총 광고비</span>
                      <span className="text-sm font-medium text-gray-900">3,733,660원</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">노출수</span>
                      <span className="text-sm font-medium text-gray-900">198,420회</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">클릭수</span>
                      <span className="text-sm font-medium text-gray-900">1,734회</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CTR</span>
                      <span className="text-sm font-medium text-blue-600">0.87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">평균 CPC</span>
                      <span className="text-sm font-medium text-gray-900">2,153원</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">전환수</span>
                      <span className="text-sm font-medium text-gray-900">68건</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">전환율</span>
                      <span className="text-sm font-medium text-green-600">3.92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CPL</span>
                      <span className="text-sm font-medium text-gray-900">54,907원</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-blue-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">예상 매출</span>
                        <span className="text-lg font-bold text-blue-600">142,800,000원</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">ROAS</span>
                        <span className="text-sm font-bold text-blue-600">3,825%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 네이버 광고 성과 */}
                <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">N</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">네이버 파워링크</h4>
                    </div>
                    <span className="text-sm text-green-600 font-medium">비용 54.8%</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">총 광고비</span>
                      <span className="text-sm font-medium text-gray-900">4,526,640원</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">노출수</span>
                      <span className="text-sm font-medium text-gray-900">286,810회</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">클릭수</span>
                      <span className="text-sm font-medium text-gray-900">2,108회</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CTR</span>
                      <span className="text-sm font-medium text-green-600">0.74%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">평균 CPC</span>
                      <span className="text-sm font-medium text-gray-900">2,147원</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">전환수</span>
                      <span className="text-sm font-medium text-gray-900">88건</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">전환율</span>
                      <span className="text-sm font-medium text-green-600">4.18%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">CPL</span>
                      <span className="text-sm font-medium text-gray-900">51,439원</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-green-200">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">예상 매출</span>
                        <span className="text-lg font-bold text-green-600">154,880,000원</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-600">ROAS</span>
                        <span className="text-sm font-bold text-green-600">3,422%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 핵심 인사이트 */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-3">📊 핵심 인사이트</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">네이버가 구글보다 <span className="font-medium">노출수 44.5% 더 많지만</span>, CTR은 구글이 0.13%p 더 높음</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-600">✓</span>
                    <span className="text-gray-700">전환율은 네이버가 <span className="font-medium">4.18%로 구글(3.92%)보다 우수</span></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600">💡</span>
                    <span className="text-gray-700">구글은 <span className="font-medium">ROAS가 더 높아</span> 투자 대비 수익성이 우수함</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-600">🎯</span>
                    <span className="text-gray-700">네이버는 <span className="font-medium">CPL이 더 낮아</span> 리드 획득 효율성이 높음</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedTab === 'keywords' && (
        <div className="space-y-6">
          {/* 키워드 성과 테이블 */}
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h3 className="card-title">키워드 성과</h3>
              <div className="flex gap-2">
                <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm">
                  <option value="all">전체 채널</option>
                  <option value="google">구글 애즈</option>
                  <option value="naver">네이버 파워링크</option>
                </select>
                <button className="btn btn-sm btn-outline">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  내보내기
                </button>
              </div>
            </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">키워드</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">채널</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">매칭타입</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">입찰가</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">노출수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">클릭수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPC</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">전환수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">품질지수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  keyword: '캐릭터 굿즈 제작',
                  channel: '구글',
                  matchType: '구문일치',
                  bid: 2500,
                  impressions: 15420,
                  clicks: 342,
                  ctr: 2.22,
                  cpc: 2150,
                  conversions: 28,
                  qualityScore: 8
                },
                {
                  keyword: '기업 선물 제작',
                  channel: '네이버',
                  matchType: '확장검색',
                  bid: 1800,
                  impressions: 28900,
                  clicks: 456,
                  ctr: 1.58,
                  cpc: 1650,
                  conversions: 35,
                  qualityScore: 7
                },
                {
                  keyword: '쵸바 키링',
                  channel: '구글',
                  matchType: '완전일치',
                  bid: 1200,
                  impressions: 8900,
                  clicks: 234,
                  ctr: 2.63,
                  cpc: 980,
                  conversions: 12,
                  qualityScore: 9
                },
                {
                  keyword: '맞춤 인형 제작',
                  channel: '네이버',
                  matchType: '구문일치',
                  bid: 3200,
                  impressions: 12300,
                  clicks: 189,
                  ctr: 1.54,
                  cpc: 2890,
                  conversions: 18,
                  qualityScore: 6
                },
                {
                  keyword: '캐릭터 OEM',
                  channel: '구글',
                  matchType: '확장검색',
                  bid: 2800,
                  impressions: 6700,
                  clicks: 156,
                  ctr: 2.33,
                  cpc: 2450,
                  conversions: 22,
                  qualityScore: 8
                },
                {
                  keyword: '판촉물 제작업체',
                  channel: '네이버',
                  matchType: '구문일치',
                  bid: 2200,
                  impressions: 34500,
                  clicks: 523,
                  ctr: 1.52,
                  cpc: 1980,
                  conversions: 41,
                  qualityScore: 7
                }
              ].map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.keyword}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.channel === '구글' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.channel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.matchType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.bid.toLocaleString()}원</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.impressions.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.clicks}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.ctr}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.cpc.toLocaleString()}원</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{item.conversions}</div>
                    <div className="text-xs text-gray-500">{((item.conversions / item.clicks) * 100).toFixed(1)}%</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${
                        item.qualityScore >= 8 ? 'text-green-600' : 
                        item.qualityScore >= 6 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {item.qualityScore}/10
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-blue-600 hover:text-blue-900 mr-2">수정</button>
                    <button className="text-gray-600 hover:text-gray-900">일시정지</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 채널별 성과 비교 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">구글 vs 네이버 성과 비교</h3>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">구글 검색광고</span>
                  <span className="text-sm text-gray-900">1,234,000원</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium text-gray-900">586</div>
                    <div className="text-gray-500">클릭수</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium text-gray-900">2,106원</div>
                    <div className="text-gray-500">CPC</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium text-gray-900">48건</div>
                    <div className="text-gray-500">전환</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium text-gray-900">8.2%</div>
                    <div className="text-gray-500">전환율</div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">네이버 파워링크</span>
                  <span className="text-sm text-gray-900">1,111,000원</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium text-gray-900">648</div>
                    <div className="text-gray-500">클릭수</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium text-gray-900">1,715원</div>
                    <div className="text-gray-500">CPC</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium text-gray-900">41건</div>
                    <div className="text-gray-500">전환</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <div className="font-medium text-gray-900">6.3%</div>
                    <div className="text-gray-500">전환율</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">시간대별 클릭 패턴</h3>
          </div>
          <div className="card-body">
            <div className="h-48 flex items-end gap-1">
              {[
                { hour: '9시', google: 12, naver: 8 },
                { hour: '10시', google: 25, naver: 18 },
                { hour: '11시', google: 34, naver: 28 },
                { hour: '12시', google: 28, naver: 32 },
                { hour: '13시', google: 22, naver: 25 },
                { hour: '14시', google: 38, naver: 35 },
                { hour: '15시', google: 45, naver: 42 },
                { hour: '16시', google: 52, naver: 48 },
                { hour: '17시', google: 48, naver: 45 },
                { hour: '18시', google: 35, naver: 38 },
                { hour: '19시', google: 28, naver: 30 },
                { hour: '20시', google: 18, naver: 22 }
              ].map((item, idx) => (
                <div key={idx} className="flex-1">
                  <div className="relative h-full flex justify-center gap-1">
                    <div 
                      className="w-2 bg-blue-500 rounded-t"
                      style={{ height: `${(item.google / 52) * 100}%` }}
                    ></div>
                    <div 
                      className="w-2 bg-green-500 rounded-t"
                      style={{ height: `${(item.naver / 52) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-600 text-center mt-1">{item.hour}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-xs text-gray-600">구글</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-xs text-gray-600">네이버</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 최적화 제안 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">키워드 최적화 제안</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">품질지수 개선 필요</h4>
              </div>
              <p className="text-sm text-gray-600">
                '맞춤 인형 제작' 키워드의 품질지수가 6점으로 낮습니다. 
                랜딩페이지 개선으로 CPC 20% 절감 가능합니다.
              </p>
              <button className="text-sm text-red-600 hover:text-red-800 mt-2">개선하기 →</button>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">추천 키워드</h4>
              </div>
              <p className="text-sm text-gray-600">
                '캐릭터 라이선스' 키워드 추가 시 월 50건의 추가 문의가 예상됩니다. 
                예상 CPC 2,300원
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-800 mt-2">추가하기 →</button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-medium text-gray-900">입찰가 조정</h4>
              </div>
              <p className="text-sm text-gray-600">
                오후 3-5시 입찰가를 15% 상향하면 전환율이 높은 시간대의 
                노출을 늘릴 수 있습니다.
              </p>
              <button className="text-sm text-green-600 hover:text-green-800 mt-2">적용하기 →</button>
            </div>
          </div>
        </div>
      </div>
        </div>
      )}

      {selectedTab === 'conversion' && (
        <div className="space-y-6">
          {/* 전환 퍼널 분석 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">전환 퍼널 분석</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {[
                  { stage: '광고 노출', count: 485320, rate: 100, color: 'bg-blue-500' },
                  { stage: '광고 클릭', count: 2847, rate: 0.59, color: 'bg-blue-400' },
                  { stage: '사이트 방문', count: 2562, rate: 90.0, color: 'bg-green-500' },
                  { stage: '상담 문의', count: 156, rate: 6.1, color: 'bg-green-400' },
                  { stage: '견적 요청', count: 89, rate: 57.1, color: 'bg-yellow-500' },
                  { stage: '계약 완료', count: 42, rate: 47.2, color: 'bg-purple-500' }
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                          {idx + 1}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.stage}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-900">{item.count.toLocaleString()}</span>
                        {idx > 0 && (
                          <span className="text-xs text-gray-500 ml-2">({item.rate}%)</span>
                        )}
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-6">
                      <div 
                        className={`${item.color} h-6 rounded-full relative`} 
                        style={{ width: idx === 0 ? '100%' : `${(item.count / 485320) * 100}%` }}
                      >
                        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-white font-medium">
                          {idx === 0 ? '100%' : `${((item.count / 485320) * 100).toFixed(2)}%`}
                        </span>
                      </div>
                    </div>
                    {idx < 5 && (
                      <div className="text-center mt-2">
                        <svg className="w-4 h-4 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 유입 경로별 전환 성과 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">검색어별 전환 성과</h3>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  {[
                    { keyword: '캐릭터 굿즈 제작', visits: 892, inquiries: 45, contracts: 12, value: 84000000 },
                    { keyword: '기업 선물 제작', visits: 756, inquiries: 38, contracts: 8, value: 56000000 },
                    { keyword: '판촉물 제작업체', visits: 623, inquiries: 28, contracts: 7, value: 49000000 },
                    { keyword: '맞춤 인형 제작', visits: 456, inquiries: 22, contracts: 6, value: 42000000 },
                    { keyword: '캐릭터 OEM', visits: 389, inquiries: 18, contracts: 5, value: 35000000 },
                    { keyword: '쵸바 키링', visits: 234, inquiries: 8, contracts: 4, value: 28000000 }
                  ].map((item, idx) => (
                    <div key={idx} className="border-b border-gray-100 pb-3 last:border-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.keyword}</p>
                          <div className="flex gap-4 mt-1 text-xs text-gray-500">
                            <span>방문 {item.visits}</span>
                            <span>문의 {item.inquiries}</span>
                            <span>계약 {item.contracts}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{(item.value / 1000000).toFixed(0)}M</p>
                          <p className="text-xs text-gray-500">예상 매출</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">디바이스별 전환율</h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">데스크톱</span>
                      <span className="text-sm text-gray-900">68% (1,738명)</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">전환율 8.2%</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">모바일</span>
                      <span className="text-sm text-gray-900">28% (715명)</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">전환율 3.5%</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">태블릿</span>
                      <span className="text-sm text-gray-900">4% (109명)</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div className="bg-purple-500 h-3 rounded-full" style={{ width: '4%' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">전환율 5.1%</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    💡 B2B 특성상 데스크톱 전환율이 월등히 높습니다. 
                    모바일 최적화보다 데스크톱 경험 개선에 집중하세요.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 전환 시간 분석 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">시간대별 전환 분석</h3>
            </div>
            <div className="card-body">
              <div className="text-sm text-gray-600 mb-4">
                문의 접수부터 계약까지 평균 소요 시간: <span className="font-medium text-gray-900">5.2일</span>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-5 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">24시간 이내</p>
                    <p className="text-lg font-bold text-gray-900">15%</p>
                    <p className="text-xs text-gray-500">6건</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-600">1-3일</p>
                    <p className="text-lg font-bold text-blue-600">35%</p>
                    <p className="text-xs text-gray-500">15건</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <p className="text-xs text-gray-600">4-7일</p>
                    <p className="text-lg font-bold text-blue-700">28%</p>
                    <p className="text-xs text-gray-500">12건</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">8-14일</p>
                    <p className="text-lg font-bold text-gray-900">15%</p>
                    <p className="text-xs text-gray-500">6건</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600">15일 이상</p>
                    <p className="text-lg font-bold text-gray-900">7%</p>
                    <p className="text-xs text-gray-500">3건</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'budget' && (
        <div className="space-y-6">
          {/* 월별 예산 집행 현황 */}
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h3 className="card-title">월별 예산 집행 현황</h3>
              <select className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm">
                <option value="2024">2024년</option>
                <option value="2023">2023년</option>
              </select>
            </div>
            <div className="card-body">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">월</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">예산</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">집행액</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">집행률</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">전환수</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">CPA</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">매출</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-gray-700">ROAS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { month: '1월', budget: 8000000, spent: 7234000, conversions: 35, revenue: 245000000 },
                      { month: '2월', budget: 8000000, spent: 7856000, conversions: 38, revenue: 266000000 },
                      { month: '3월', budget: 8500000, spent: 8234000, conversions: 42, revenue: 294000000 },
                      { month: '4월', budget: 8500000, spent: 8156000, conversions: 40, revenue: 280000000 },
                      { month: '5월', budget: 9000000, spent: 8567000, conversions: 45, revenue: 315000000 },
                      { month: '6월', budget: 8000000, spent: 6975000, conversions: 42, revenue: 294000000 }
                    ].map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.month}</td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">{item.budget.toLocaleString()}원</td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">{item.spent.toLocaleString()}원</td>
                        <td className="py-3 px-4 text-sm text-right">
                          <span className={`font-medium ${
                            (item.spent / item.budget) > 0.95 ? 'text-red-600' : 
                            (item.spent / item.budget) > 0.8 ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {((item.spent / item.budget) * 100).toFixed(1)}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">{item.conversions}건</td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">
                          {Math.round(item.spent / item.conversions).toLocaleString()}원
                        </td>
                        <td className="py-3 px-4 text-sm text-right text-gray-900">
                          {(item.revenue / 1000000).toFixed(0)}M
                        </td>
                        <td className="py-3 px-4 text-sm text-right font-medium text-green-600">
                          {((item.revenue / item.spent) * 100).toFixed(0)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 font-medium">
                      <td className="py-3 px-4 text-sm text-gray-900">합계</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-900">50,000,000원</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-900">47,022,000원</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-900">94.0%</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-900">242건</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-900">194,306원</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-900">1,694M</td>
                      <td className="py-3 px-4 text-sm text-right text-green-600">3,602%</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          {/* 예산 배분 및 효율성 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">채널별 예산 배분</h3>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">총 월 예산</span>
                    <span className="text-lg font-bold text-gray-900">8,000,000원</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-4 flex overflow-hidden">
                    <div className="bg-blue-500 h-4" style={{ width: '52%' }}></div>
                    <div className="bg-green-500 h-4" style={{ width: '48%' }}></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-sm font-medium text-gray-900">구글 검색광고</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">4,160,000원</p>
                      <p className="text-xs text-gray-500">52%</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-sm font-medium text-gray-900">네이버 파워링크</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">3,840,000원</p>
                      <p className="text-xs text-gray-500">48%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">예산 효율성 지표</h3>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">3,602%</p>
                    <p className="text-sm text-gray-600 mt-1">평균 ROAS</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">194,306원</p>
                    <p className="text-sm text-gray-600 mt-1">평균 CPA</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">7.0M</p>
                    <p className="text-sm text-gray-600 mt-1">건당 평균 매출</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">94.0%</p>
                    <p className="text-sm text-gray-600 mt-1">예산 집행률</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 예산 최적화 제안 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">예산 최적화 제안</h3>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">예산 재배분</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    구글 광고의 ROAS가 15% 높습니다. 네이버 예산의 10%를 구글로 이동 시 월 2,100만원 추가 매출 예상
                  </p>
                  <button className="text-sm text-blue-600 hover:text-blue-800">검토하기 →</button>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">시즌별 조정</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    3-5월 신학기 시즌에 예산을 20% 증액하면 연간 매출 8% 상승 예상
                  </p>
                  <button className="text-sm text-green-600 hover:text-green-800">계획 수립 →</button>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">비효율 키워드</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    CPA가 50만원을 초과하는 3개 키워드 제외 시 월 80만원 절감 가능
                  </p>
                  <button className="text-sm text-yellow-600 hover:text-yellow-800">분석하기 →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}