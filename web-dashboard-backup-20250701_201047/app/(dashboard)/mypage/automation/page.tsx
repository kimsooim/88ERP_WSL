'use client';

import { useState } from 'react';

interface Rule {
  id: number;
  name: string;
  description: string;
  status: string;
  type: string;
  trigger: string;
  lastRun: string;
  frequency: string;
  actions: string[];
}

export default function MyPageAutomationPage() {
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">개인 자동화</h1>
          <p className="text-gray-600 mt-1">나만의 업무 자동화 규칙을 설정하고 관리하세요</p>
        </div>
        <button className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          자동화 규칙 추가
        </button>
      </div>

      {/* NAS 작업 자동화 흐름도 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">NAS 작업 자동화 흐름</h3>
          <span className="text-sm text-gray-500">250701_n8n.md 시나리오 기반</span>
        </div>
        <div className="card-body">
          <div className="relative">
            {/* 흐름도 */}
            <div className="flex items-center justify-between">
              {/* Claude */}
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Claude</p>
                <p className="text-xs text-gray-500 mt-1">명령 입력</p>
              </div>

              {/* Arrow */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="h-0.5 bg-gray-300 w-full"></div>
                </div>
                <div className="relative flex justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* n8n */}
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">n8n</p>
                <p className="text-xs text-gray-500 mt-1">Webhook</p>
              </div>

              {/* Arrow */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="h-0.5 bg-gray-300 w-full"></div>
                </div>
                <div className="relative flex justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* NAS */}
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                </div>
                <p className="text-sm font-medium">NAS</p>
                <p className="text-xs text-gray-500 mt-1">파일 작업</p>
              </div>

              {/* Arrow */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="h-0.5 bg-gray-300 w-full"></div>
                </div>
                <div className="relative flex justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Supabase */}
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Supabase</p>
                <p className="text-xs text-gray-500 mt-1">로그 저장</p>
              </div>

              {/* Arrow */}
              <div className="flex-1 relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="h-0.5 bg-gray-300 w-full"></div>
                </div>
                <div className="relative flex justify-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Dashboard */}
              <div className="text-center">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">88ERP</p>
                <p className="text-xs text-gray-500 mt-1">결과 표시</p>
              </div>
            </div>

            {/* 예시 명령 */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h5 className="text-sm font-medium text-gray-900 mb-3">예시 명령</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-white rounded border border-gray-200">
                  <code className="text-purple-600">"88toy.txt 파일의 첫 5줄을 삭제해줘"</code>
                  <p className="text-xs text-gray-500 mt-1">→ POST /nas-edit {"{ file: '88toy.txt', action: 'delete_line', count: 5 }"}</p>
                </div>
                <div className="p-3 bg-white rounded border border-gray-200">
                  <code className="text-purple-600">"image_backup 폴더를 archive로 이동해줘"</code>
                  <p className="text-xs text-gray-500 mt-1">→ POST /nas-move {"{ source: 'image_backup', target: 'archive' }"}</p>
                </div>
              </div>
            </div>

            {/* 보안 정보 */}
            <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>모든 요청은 JWT 인증을 통해 보호되며, Cloudflare Tunnel을 통한 안전한 연결만 허용됩니다.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 자동화 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">활성 규칙</p>
                <p className="text-2xl font-bold text-gray-900">14개</p>
                <p className="text-xs text-green-600 mt-1">NAS 작업 2개 포함</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <p className="text-sm text-gray-600">오늘 실행</p>
                <p className="text-2xl font-bold text-gray-900">48회</p>
                <p className="text-xs text-blue-600 mt-1">평균 0.8초</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <p className="text-sm text-gray-600">절약 시간</p>
                <p className="text-2xl font-bold text-gray-900">6.2시간</p>
                <p className="text-xs text-purple-600 mt-1">이번주 누적</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <p className="text-sm text-gray-600">알림 발송</p>
                <p className="text-2xl font-bold text-gray-900">156개</p>
                <p className="text-xs text-gray-500 mt-1">이번달 누적</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 자동화 규칙 목록 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">내 자동화 규칙</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            {
              id: 1,
              name: '일일 업무 리포트',
              description: '매일 오후 6시에 나의 업무 현황을 정리하여 이메일로 발송',
              status: 'active',
              type: '알림',
              trigger: '매일 18:00',
              lastRun: '오늘 18:00',
              frequency: '매일 1회',
              actions: ['데이터 수집', '리포트 생성', '이메일 발송']
            },
            {
              id: 2,
              name: '중요 작업 리마인더',
              description: '마감일 하루 전 중요 작업에 대한 알림 발송',
              status: 'active',
              type: '알림',
              trigger: '마감 1일 전',
              lastRun: '어제 09:00',
              frequency: '조건 발생시',
              actions: ['작업 확인', '우선순위 판단', '알림 발송']
            },
            {
              id: 3,
              name: '주간 성과 대시보드',
              description: '매주 월요일 오전 나의 주간 성과 대시보드 자동 생성',
              status: 'active',
              type: '리포트',
              trigger: '매주 월 09:00',
              lastRun: '지난 월요일',
              frequency: '주 1회',
              actions: ['데이터 집계', '차트 생성', '대시보드 업데이트']
            },
            {
              id: 4,
              name: '재고 부족 사전 알림',
              description: '담당 상품 재고가 30% 이하로 떨어지면 즉시 알림',
              status: 'active',
              type: '모니터링',
              trigger: '재고 30% 이하',
              lastRun: '3시간 전',
              frequency: '평균 3회/일',
              actions: ['재고 확인', '트렌드 분석', '알림 발송', '발주 제안']
            },
            {
              id: 5,
              name: 'VIP 고객 생일 알림',
              description: 'VIP 고객 생일 3일 전 축하 메시지 준비 알림',
              status: 'inactive',
              type: '고객관리',
              trigger: '생일 3일 전',
              lastRun: '5일 전',
              frequency: '평균 2회/주',
              actions: ['고객 확인', '메시지 템플릿', '알림 발송']
            },
            {
              id: 6,
              name: '문서 백업 자동화',
              description: '중요 문서 수정시 자동으로 백업 버전 생성',
              status: 'active',
              type: '백업',
              trigger: '문서 수정시',
              lastRun: '30분 전',
              frequency: '평균 15회/일',
              actions: ['변경 감지', '백업 생성', '버전 관리']
            },
            {
              id: 7,
              name: 'NAS 파일 작업 자동화',
              description: 'Claude 명령을 받아 NAS 파일을 자동으로 수정/삭제/이동',
              status: 'active',
              type: 'NAS작업',
              trigger: 'Claude 명령시',
              lastRun: '2시간 전',
              frequency: '평균 8회/일',
              actions: ['명령 해석', 'NAS 접속', '파일 작업', 'Supabase 기록']
            },
            {
              id: 8,
              name: '대량 파일 정리 자동화',
              description: '특정 폴더의 오래된 파일을 자동으로 아카이브하거나 삭제',
              status: 'active',
              type: 'NAS작업',
              trigger: '매일 02:00',
              lastRun: '오늘 02:00',
              frequency: '매일 1회',
              actions: ['파일 스캔', '조건 확인', '아카이브 실행', '리포트 생성']
            }
          ].map((rule) => (
            <div 
              key={rule.id} 
              className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => setSelectedRule(rule)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h4 className="text-lg font-semibold text-gray-900">{rule.name}</h4>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-700">
                      {rule.type}
                    </span>
                    {rule.status === 'active' ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        활성
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                        비활성
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {rule.actions.map((action, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {action}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      트리거: {rule.trigger}
                    </span>
                    <span>마지막 실행: {rule.lastRun}</span>
                    <span>빈도: {rule.frequency}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button 
                    className="p-2 text-gray-400 hover:text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      // 편집 로직
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      // 토글 로직
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 실행 로그 및 템플릿 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">최근 실행 로그</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[
                { time: '10분 전', rule: 'NAS 파일 작업 자동화', status: 'success', detail: '88toy.txt 첫 5줄 삭제 완료' },
                { time: '30분 전', rule: '문서 백업 자동화', status: 'success', detail: '프로젝트 계획서 백업' },
                { time: '2시간 전', rule: 'NAS 파일 작업 자동화', status: 'success', detail: 'image_backup 폴더 이동 완료' },
                { time: '3시간 전', rule: '재고 부족 사전 알림', status: 'success', detail: '쵸바 계란 키링 재고 28%' },
                { time: '오늘 02:00', rule: '대량 파일 정리 자동화', status: 'success', detail: '30일 이상 파일 1,234개 아카이브' }
              ].map((log, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.rule}</p>
                      <p className="text-xs text-gray-500">{log.time} · {log.detail}</p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800">상세</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">추천 자동화 템플릿</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[
                { name: '업무 시작 체크리스트', description: '매일 업무 시작시 오늘의 할 일 목록 자동 생성' },
                { name: '주간 회의록 정리', description: '회의 후 자동으로 회의록 템플릿 생성 및 참석자 공유' },
                { name: '고객 응대 후속조치', description: '고객 문의 24시간 후 자동으로 만족도 확인' },
                { name: '프로젝트 진행상황', description: '프로젝트 마일스톤별 진행상황 자동 업데이트' }
              ].map((template, idx) => (
                <div key={idx} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                  <h4 className="text-sm font-medium text-gray-900">{template.name}</h4>
                  <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                  <button className="text-xs text-blue-600 hover:text-blue-800 mt-2">
                    템플릿 사용 →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 자동화 인사이트 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">자동화 인사이트</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">78%</div>
              <p className="text-sm text-gray-600 mt-1">업무 효율성 향상</p>
              <p className="text-xs text-gray-500 mt-2">자동화 도입 후 업무 처리 속도가 78% 개선되었습니다</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">312시간</div>
              <p className="text-sm text-gray-600 mt-1">연간 절약 시간</p>
              <p className="text-xs text-gray-500 mt-2">자동화를 통해 연간 312시간을 절약할 수 있습니다</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">95%</div>
              <p className="text-sm text-gray-600 mt-1">작업 정확도</p>
              <p className="text-xs text-gray-500 mt-2">자동화된 작업의 정확도가 95%에 달합니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}