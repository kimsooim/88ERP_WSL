'use client';

import { useState } from 'react';
import { useLog } from '../../../contexts/LogContext';

interface WorkflowStatus {
  status: string;
  step: number;
  startTime?: Date;
  intervalId?: any;
  collectedBranches?: number;
  totalBranches?: number;
  fileName?: string;
  lastRun?: string;
  failedStep?: string;
}

export default function OfflineAutomationPage() {
  const { addChangeLog, addSystemLog } = useLog();
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [runningWorkflows, setRunningWorkflows] = useState<{ [key: string]: WorkflowStatus }>({});
  const [settingsModal, setSettingsModal] = useState<{ open: boolean; storeId: string | null }>({ open: false, storeId: null });
  const [storeSettings, setStoreSettings] = useState<{ [key: string]: any }>({});
  const [editingStore, setEditingStore] = useState<{ id: string | null; field: string | null }>({ id: null, field: null });
  const [storeInfo, setStoreInfo] = useState<{ [key: string]: any }>({});
  
  // 거래처별 자동화 상태
  const stores = [
    {
      id: 'aland-daily',
      name: '에이랜드 (일일매출)',
      branches: 12,
      status: 'ready',
      lastRun: '2025-07-01 09:00',
      workflow: ['비즈패션 데이터 다운', '엑셀 데이터 분석', '이메일 발송', 'Supabase 전송'],
      automationType: 'daily',
      description: '일일 매출 이메일 자동 발송',
      dataPath: '\\\\ds920\\2bot\\2aland\\input'
    },
    {
      id: 'aland',
      name: '에이랜드 (월말매출)',
      branches: 12,
      status: 'ready',
      lastRun: '2025-06-30 21:00',
      workflow: ['비즈패션 데이터 다운', '엑셀 데이터 분석', '이메일 발송', '이카운트 입력', 'Supabase 전송'],
      automationType: 'monthly',
      description: '월말 매출 데이터 자동 수집 및 보고',
      dataPath: '\\\\ds920\\2bot\\2aland\\input'
    },
    {
      id: 'kyobo-daily',
      name: '교보문고 (일일매출)',
      branches: 8,
      status: 'ready',
      lastRun: '2025-07-01 09:00',
      workflow: ['NAS 데이터 저장', 'Supabase 전송', '웹대시보드 연동'],
      automationType: 'daily',
      description: '매일 판매현황 NAS 자동 저장',
      dataPath: '\\\\ds920\\2bot\\kyobo\\daily'
    },
    {
      id: 'kyobo',
      name: '교보문고 (월말매출)',
      branches: 8,
      status: 'ready',
      lastRun: '2025-06-30 21:00',
      workflow: ['월말매출 확인', '이카운트 입력', '세금계산서 역발행 준비'],
      automationType: 'monthly',
      description: '월말매출 금액 확인 및 이카운트 입력',
      dataPath: '\\\\ds920\\2bot\\kyobo\\monthly'
    },
    {
      id: 'ilsang',
      name: '일상의틈 범계점',
      branches: 1,
      status: 'ready',
      lastRun: '2025-06-05 10:30',
      workflow: ['메일 수신 대기', '첨부파일 저장', '데이터 분석', '이카운트 입력', '세금계산서 발행', 'Supabase 전송'],
      automationType: 'monthly',
      description: '메일로 받은 매출자료 자동 처리',
      dataPath: '\\\\ds920\\2bot\\ilsang\\mail_attachments'
    },
    {
      id: 'morning',
      name: '모닝글로리 홍대점',
      branches: 1,
      status: 'inactive',
      workflow: ['데이터 수집', '이카운트 입력', 'Supabase 전송'],
      automationType: 'monthly'
    },
    {
      id: 'dotmeal',
      name: '닷밀',
      branches: 2,
      status: 'inactive',
      workflow: ['데이터 수집', '이카운트 입력', 'Supabase 전송'],
      automationType: 'monthly',
      subStores: ['안성점', '제주점']
    },
    {
      id: 'nemone',
      name: '네모네',
      branches: 4,
      status: 'inactive',
      workflow: ['데이터 수집', '이카운트 입력', 'Supabase 전송'],
      automationType: 'monthly',
      subStores: ['명동점', '고척점', '광복점', '연수점']
    },
    {
      id: 'a2g',
      name: '에이투지 인사동점',
      branches: 1,
      status: 'inactive',
      workflow: ['데이터 수집', '이카운트 입력', 'Supabase 전송'],
      automationType: 'monthly'
    },
    {
      id: 'hyundai',
      name: '현대백화점',
      branches: 3,
      status: 'inactive',
      workflow: ['백화점 정산 데이터', '수수료 계산', '이카운트 입력', '세금계산서 발행', 'Supabase 전송'],
      automationType: 'monthly',
      description: '백화점 정산 시스템 연동 필요'
    },
    {
      id: 'lotte',
      name: '롯데백화점',
      branches: 2,
      status: 'inactive',
      workflow: ['백화점 정산 데이터', '수수료 계산', '이카운트 입력', '세금계산서 발행', 'Supabase 전송'],
      automationType: 'monthly',
      description: '백화점 정산 시스템 연동 필요'
    }
  ];

  const handleStartWorkflow = (storeId: string) => {
    const store = stores.find(s => s.id === storeId);
    if (!store) return;
    
    const fileName = `sales_${new Date().toISOString().split('T')[0]}_${Math.random().toString(36).substr(2, 9)}.xlsx`;
    const now = new Date();
    const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    // 워크플로우 시작 로그
    addSystemLog({
      level: 'info',
      service: 'n8n',
      message: `${store.name} 워크플로우 시작`,
      details: `${store.branches}개 지점 데이터 수집 시작`
    });
    
    setRunningWorkflows(prev => ({
      ...prev,
      [storeId]: { status: 'running', step: 0, startTime: now, intervalId: null, collectedBranches: 0, totalBranches: store.branches, fileName, lastRun: formattedTime }
    }));
    
    // 워크플로우 단계별 실행 시뮬레이션
    let step = 0;
    let collectedBranches = 0;
    
    const intervalId = setInterval(() => {
      step++;
      
      // 데이터 수집 단계에서 지점수 증가
      if (step === 1) {
        // 첫 번째 단계에서 일부 지점 수집
        collectedBranches = Math.ceil(store.branches * 0.3);
      } else if (step === 2) {
        // 두 번째 단계에서 더 많은 지점 수집
        collectedBranches = Math.ceil(store.branches * 0.7);
      } else if (step === 3) {
        // 세 번째 단계에서 모든 지점 수집 완료
        collectedBranches = store.branches;
      }
      
      // Supabase 전송 단계에서 실패 처리
      const currentStepName = store.workflow[step - 1];
      if (currentStepName === 'Supabase 전송') {
        clearInterval(intervalId);
        setRunningWorkflows(prev => ({
          ...prev,
          [storeId]: { ...prev[storeId], status: 'failed', step: step - 1, intervalId: null, collectedBranches, failedStep: 'Supabase 전송' }
        }));
        return;
      }
      
      if (step >= store.workflow.length) {
        clearInterval(intervalId);
        setRunningWorkflows(prev => ({
          ...prev,
          [storeId]: { ...prev[storeId], status: 'completed', step, intervalId: null, collectedBranches: store.branches }
        }));
      } else {
        setRunningWorkflows(prev => ({
          ...prev,
          [storeId]: { ...prev[storeId], step, collectedBranches }
        }));
      }
    }, 2000);
    
    // intervalId 저장 (중지 기능을 위해)
    setRunningWorkflows(prev => ({
      ...prev,
      [storeId]: { ...prev[storeId], intervalId }
    }));
  };
  
  const handleStopWorkflow = (storeId: string) => {
    const workflow = runningWorkflows[storeId];
    if (workflow?.intervalId) {
      clearInterval(workflow.intervalId);
    }
    setRunningWorkflows(prev => ({
      ...prev,
      [storeId]: { ...prev[storeId], status: 'stopped', intervalId: null }
    }));
  };
  
  const handleRefreshWorkflow = (storeId: string) => {
    const workflow = runningWorkflows[storeId];
    if (workflow?.intervalId) {
      clearInterval(workflow.intervalId);
    }
    setRunningWorkflows(prev => ({
      ...prev,
      [storeId]: { 
        status: 'ready', 
        step: 0, 
        lastRun: prev[storeId]?.lastRun 
      }
    }));
  };

  const handleOpenSettings = (storeId: string) => {
    const store = stores.find(s => s.id === storeId);
    if (!store) return;
    
    // 기존 설정이 없으면 기본값 설정
    if (!storeSettings[storeId]) {
      setStoreSettings(prev => ({
        ...prev,
        [storeId]: {
          emails: ['ann@88toy.co.kr'],
          dataPath: store.dataPath || '',
          supabaseUrl: '',
          autoStart: false,
          scheduleDays: {
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false
          },
          scheduleTime: '09:00',
          executionComputer: 'ANN PC'
        }
      }));
    }
    setSettingsModal({ open: true, storeId });
  };

  const handleSaveSettings = () => {
    const storeId = settingsModal.storeId;
    if (!storeId) return;
    
    const store = stores.find(s => s.id === storeId);
    if (!store) return;
    
    const newSettings = storeSettings[storeId];
    
    // 설정 변경 로그 기록
    if (newSettings) {
      addChangeLog({
        user: 'Ann',
        type: 'settings',
        category: '오프라인 자동화',
        target: store.name,
        field: '설정 변경',
        oldValue: '설정 변경 전',
        newValue: `이메일: ${newSettings.emails?.join(', ') || ''}, 자동실행: ${newSettings.autoStart ? '활성' : '비활성'}`
      });
    }
    
    setSettingsModal({ open: false, storeId: null });
  };

  const handleAddEmail = (storeId: string) => {
    setStoreSettings(prev => ({
      ...prev,
      [storeId]: {
        ...prev[storeId],
        emails: [...(prev[storeId]?.emails || []), '']
      }
    }));
  };

  const handleRemoveEmail = (storeId: string, emailIndex: number) => {
    setStoreSettings(prev => ({
      ...prev,
      [storeId]: {
        ...prev[storeId],
        emails: prev[storeId].emails.filter((_: any, index: number) => index !== emailIndex)
      }
    }));
  };

  const handleEditStore = (storeId: string, field: string, value: string) => {
    const store = stores.find(s => s.id === storeId);
    const oldValue = getStoreInfo(store, field);
    
    setStoreInfo(prev => ({
      ...prev,
      [storeId]: {
        ...prev[storeId],
        [field]: value
      }
    }));
    
    // 변경 로그 기록
    if (oldValue !== value) {
      addChangeLog({
        user: 'Ann',
        type: 'edit',
        category: '오프라인 자동화',
        target: store.name,
        field: field === 'name' ? '제목' : '설명',
        oldValue: oldValue,
        newValue: value
      });
    }
  };

  const getStoreInfo = (store: any, field: string) => {
    return storeInfo[store.id]?.[field] || store[field];
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">오프라인 거래처 자동화</h1>
          <p className="text-gray-600 mt-1">월말 매출 보고 및 데이터 수집 자동화 시스템</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            n8n 설정
          </button>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            거래처 추가
          </button>
        </div>
      </div>

      {/* 자동화 현황 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">활성 거래처</p>
                <p className="text-2xl font-bold text-gray-900">5개</p>
                <p className="text-xs text-green-600 mt-1">자동화 구축 완료</p>
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
                <p className="text-sm text-gray-600">대기중 거래처</p>
                <p className="text-2xl font-bold text-gray-900">6개</p>
                <p className="text-xs text-gray-600 mt-1">자동화 예정</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <p className="text-sm text-gray-600">이번달 실행</p>
                <p className="text-2xl font-bold text-gray-900">156회</p>
                <p className="text-xs text-blue-600 mt-1">전월 대비 +23%</p>
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
                <p className="text-2xl font-bold text-gray-900">48시간</p>
                <p className="text-xs text-purple-600 mt-1">이번달 누적</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 거래처별 자동화 현황 */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">거래처별 자동화 워크플로우</h3>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              완료
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              진행중
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              대기
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {stores.map((store) => {
          const workflow = runningWorkflows[store.id];
          const isRunning = workflow?.status === 'running';
          const isCompleted = workflow?.status === 'completed';
          
          return (
            <div key={store.id} className="card">
              <div className="card-body">
                <div className="mb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        {editingStore.id === store.id && editingStore.field === 'name' ? (
                          <input
                            type="text"
                            value={getStoreInfo(store, 'name')}
                            onChange={(e) => handleEditStore(store.id, 'name', e.target.value)}
                            onBlur={() => setEditingStore({ id: null, field: null })}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                setEditingStore({ id: null, field: null });
                              }
                            }}
                            className="text-lg font-semibold px-2 py-1 border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                        ) : (
                          <div className="flex items-center gap-1 group">
                            <h4 className="text-lg font-semibold text-gray-900">{getStoreInfo(store, 'name')}</h4>
                            <button
                              onClick={() => setEditingStore({ id: store.id, field: 'name' })}
                              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-opacity"
                              title="제목 수정"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                        )}
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          store.status === 'ready' ? 'bg-green-100 text-green-800' : 
                          store.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {store.status === 'ready' ? '준비됨' : 
                           store.status === 'inactive' ? '미구축' : '점검중'}
                        </span>
                        {store.branches > 1 && (
                          <span className="text-sm text-gray-500">{store.branches}개 지점</span>
                        )}
                      </div>
                      {(store.description || editingStore.id === store.id) && (
                        editingStore.id === store.id && editingStore.field === 'description' ? (
                          <input
                            type="text"
                            value={getStoreInfo(store, 'description') || ''}
                            onChange={(e) => handleEditStore(store.id, 'description', e.target.value)}
                            onBlur={() => setEditingStore({ id: null, field: null })}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                setEditingStore({ id: null, field: null });
                              }
                            }}
                            placeholder="설명을 입력하세요"
                            className="text-sm text-gray-600 mt-1 px-2 py-1 w-full border border-blue-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            autoFocus
                          />
                        ) : (
                          <div className="flex items-center gap-1 group mt-1">
                            <p className="text-sm text-gray-600">{getStoreInfo(store, 'description')}</p>
                            <button
                              onClick={() => setEditingStore({ id: store.id, field: 'description' })}
                              className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-gray-600 transition-opacity"
                              title="설명 수정"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                          </div>
                        )
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      {store.status === 'ready' && (
                      <>
                        {/* 상태 표시를 가장 앞에 배치 */}
                        <div className="w-28 flex items-center">
                          {isRunning && (
                            <div className="flex items-center text-sm text-blue-600">
                              <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              실행중
                            </div>
                          )}
                          {isCompleted && (
                            <div className="text-sm text-blue-600">
                              완료
                              {store.branches > 1 && (
                                <span className="ml-1 text-xs">({store.branches}개)</span>
                              )}
                            </div>
                          )}
                          {workflow?.status === 'stopped' && (
                            <div className="text-sm text-yellow-600">
                              중지됨
                            </div>
                          )}
                          {workflow?.status === 'failed' && (
                            <div className="text-sm text-yellow-600">
                              {workflow?.step}단계 성공
                            </div>
                          )}
                          {!workflow && !isRunning && !isCompleted && workflow?.status !== 'failed' && (
                            <div className="text-sm text-gray-400">대기</div>
                          )}
                        </div>
                        
                        <button 
                          onClick={() => handleStartWorkflow(store.id)}
                          disabled={isRunning || isCompleted}
                          className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            isRunning || isCompleted 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'text-white bg-blue-600 hover:bg-blue-700 cursor-pointer'
                          }`}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {workflow?.status === 'stopped' ? '재시작' : '시작'}
                        </button>
                        
                        <button 
                          onClick={() => handleStopWorkflow(store.id)}
                          disabled={!isRunning}
                          className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            !isRunning 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'text-white bg-red-600 hover:bg-red-700 cursor-pointer'
                          }`}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                          </svg>
                          중지
                        </button>
                        
                        <button 
                          onClick={() => handleRefreshWorkflow(store.id)}
                          disabled={isRunning || !workflow}
                          className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                            isRunning || !workflow
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'text-gray-700 bg-gray-200 hover:bg-gray-300 cursor-pointer'
                          }`}
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          새로고침
                        </button>
                      </>
                    )}
                    {store.status === 'inactive' && (
                      <span className="text-xs text-gray-500">자동화 미구축</span>
                    )}
                    <button 
                      onClick={() => handleOpenSettings(store.id)}
                      className="inline-flex items-center p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" 
                      title="설정"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                    </div>
                  </div>
                </div>
                
                {/* 지점 정보 */}
                {store.subStores && (
                  <div className="flex gap-2 mt-2">
                    {store.subStores.map((subStore, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {subStore}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* 마지막 실행 날짜와 데이터 경로 */}
                {(store.lastRun || store.dataPath || workflow?.lastRun) && (
                  <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                    <span>마지막 실행: {workflow?.lastRun || store.lastRun}</span>
                    {store.dataPath && (
                      <div className="flex items-center gap-1">
                        <span className="text-right">{store.dataPath}</span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(store.dataPath);
                            alert('경로가 클립보드에 복사되었습니다!');
                          }}
                          className="p-0.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="경로 복사"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {/* 워크플로우 단계 시각화 */}
                <div className="mt-4">
                  <div className="flex items-center justify-between space-x-2">
                    {store.workflow.map((step, idx) => {
                      const isCurrentStep = workflow?.step === idx && isRunning;
                      const isCompletedStep = workflow?.step > idx || (isCompleted && workflow?.step >= idx);
                      const wasProcessed = workflow?.status === 'stopped' && idx <= workflow?.step;
                      const isFailedStep = workflow?.status === 'failed' && workflow?.step === idx;
                      
                      return (
                        <div key={idx} className="flex-1">
                          <div className="relative">
                            <div className={`h-2 rounded-full transition-all duration-500 ${
                              isFailedStep ? 'bg-red-500' :
                              isCompletedStep ? 'bg-blue-500' :
                              isCurrentStep ? 'bg-blue-500' : 
                              wasProcessed ? 'bg-yellow-500' :
                              'bg-gray-200'
                            }`}>
                              {isCurrentStep && (
                                <div className="absolute inset-0 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                              )}
                            </div>
                            <div className="h-12">
                              <p className={`text-xs mt-2 text-center ${
                                isFailedStep ? 'text-red-600 font-medium' :
                                isCompletedStep ? 'text-blue-600 font-medium' :
                                isCurrentStep ? 'text-blue-600 font-medium' :
                                wasProcessed ? 'text-yellow-600' :
                                'text-gray-500'
                              }`}>
                                {step}
                              </p>
                              {/* 단계별 세부 정보 표시 */}
                              <p className="text-xs text-center text-gray-600 mt-1 h-4">
                                {workflow && (isCompletedStep || isFailedStep) && (
                                  <>
                                    {step === '비즈패션 데이터 다운' && (
                                      <span>{store.branches * 120}행</span>
                                    )}
                                    {step === '엑셀 데이터 분석' && workflow.fileName && (
                                      <span>{workflow.fileName.split('_').pop()}</span>
                                    )}
                                    {step === '이메일 발송' && (
                                      <span>
                                        {storeSettings[store.id]?.emails?.length > 0 
                                          ? (storeSettings[store.id].emails.length === 1 
                                              ? storeSettings[store.id].emails[0] 
                                              : `${storeSettings[store.id].emails[0]} 외 ${storeSettings[store.id].emails.length - 1}명`)
                                          : 'ann@88toy.co.kr'}
                                      </span>
                                    )}
                                    {step === 'Supabase 전송' && (
                                      <span className={isFailedStep ? 'text-red-600' : ''}>
                                        {isFailedStep ? '전송 실패(미연동)' : `${store.branches * 45}행`}
                                      </span>
                                    )}
                                    {step === 'NAS 데이터 저장' && (
                                      <span>{store.branches * 80}행</span>
                                    )}
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* 타입별 배지와 진행 상태 */}
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    store.automationType === 'daily' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {store.automationType === 'daily' ? '일일 자동화' : '월말 자동화'}
                  </span>
                  {(store.id === 'aland' || store.id === 'kyobo') && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      세금계산서 역발행
                    </span>
                  )}
                  {storeSettings[store.id]?.autoStart && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      자동 실행
                    </span>
                  )}
                  </div>
                  
                  {/* 진행 상태 표시 - 오른쪽 정렬 */}
                  {workflow && (
                    <p className="text-xs text-gray-600">
                      진행률: {Math.round((workflow.step / store.workflow.length) * 100)}%
                      {store.branches > 1 && workflow.totalBranches && (
                        <span className="ml-2">
                          • 수집: {workflow.collectedBranches || 0}/{workflow.totalBranches}개 지점
                        </span>
                      )}
                      {workflow.startTime && (
                        <span className="ml-2">
                          • 소요시간: {Math.round((new Date() - new Date(workflow.startTime)) / 1000)}초
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* 실행 로그 및 n8n 템플릿 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">최근 실행 로그</h3>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[
                { time: '오늘 09:00', store: '에이랜드 (일일)', workflow: '비즈패션 데이터 다운', status: 'success', duration: '2.3초' },
                { time: '오늘 09:00', store: '교보문고 (일일)', workflow: 'NAS 데이터 저장', status: 'success', duration: '1.5초' },
                { time: '어제 21:00', store: '에이랜드 (월말)', workflow: '월말 보고서 발송', status: 'success', duration: '45초' },
                { time: '2일 전', store: '일상의틈', workflow: '메일 첨부파일 처리', status: 'error', duration: '1.2초', error: '첨부파일 없음' },
                { time: '3일 전', store: '교보문고 (일일)', workflow: 'Supabase 전송', status: 'success', duration: '3.5초' }
              ].map((log, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    {log.status === 'success' ? (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    ) : (
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        <span className="text-gray-600">{log.store}</span> - {log.workflow}
                      </p>
                      <p className="text-xs text-gray-500">
                        {log.time} · {log.duration}
                        {log.error && <span className="text-red-600"> · {log.error}</span>}
                      </p>
                    </div>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800">로그</button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">n8n 워크플로우 템플릿</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800"
              onClick={() => window.open('http://192.168.32.128:5679', '_blank')}
            >
              n8n 대시보드 열기 →
            </button>
          </div>
          <div className="card-body">
            <div className="space-y-3">
              {[
                { 
                  id: 'template-a',
                  name: 'A. 이카운트 판매입력', 
                  description: '엑셀 파일 트리거 → 이카운트 API → 세금계산서 발행',
                  status: 'active'
                },
                { 
                  id: 'template-b',
                  name: 'B. Supabase 데이터 업로드', 
                  description: '엑셀 파일 트리거 → 데이터 변환 → Supabase 전송',
                  status: 'active'
                },
                { 
                  id: 'template-c',
                  name: 'C. 웹대시보드 데이터 연동', 
                  description: 'Supabase → API 호출 → 웹대시보드 실시간 업데이트',
                  status: 'development'
                },
                { 
                  id: 'template-mail',
                  name: '메일 자동 처리', 
                  description: '메일 수신 → 첨부파일 저장 → NAS 업로드',
                  status: 'planned'
                }
              ].map((template, idx) => (
                <div key={idx} className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{template.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      template.status === 'active' ? 'bg-green-100 text-green-700' :
                      template.status === 'development' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {template.status === 'active' ? '활성' :
                       template.status === 'development' ? '개발중' : '예정'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                  {template.status === 'active' && (
                    <button className="text-xs text-blue-600 hover:text-blue-800 mt-2">
                      템플릿 복사 →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 설정 모달 */}
      {settingsModal.open && settingsModal.storeId && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                        {stores.find(s => s.id === settingsModal.storeId)?.name} 설정
                      </h3>
                      
                      <div className="space-y-4">
                        {/* 이메일 수신자 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            이메일 수신자
                          </label>
                          <div className="space-y-2">
                            {(storeSettings[settingsModal.storeId]?.emails || ['ann@88toy.co.kr']).map((email, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <input
                                  type="email"
                                  value={email}
                                  onChange={(e) => {
                                    const newEmails = [...(storeSettings[settingsModal.storeId]?.emails || [])];
                                    newEmails[index] = e.target.value;
                                    setStoreSettings(prev => ({
                                      ...prev,
                                      [settingsModal.storeId]: {
                                        ...prev[settingsModal.storeId],
                                        emails: newEmails
                                      }
                                    }));
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                {(storeSettings[settingsModal.storeId]?.emails?.length || 1) > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveEmail(settingsModal.storeId, index)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="삭제"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                )}
                              </div>
                            ))}
                            <button
                              type="button"
                              onClick={() => handleAddEmail(settingsModal.storeId)}
                              className="w-full py-2 px-3 border-2 border-dashed border-gray-300 rounded-md text-sm text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                            >
                              + 이메일 추가
                            </button>
                          </div>
                        </div>

                        {/* 데이터 경로 */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            데이터 경로
                          </label>
                          <input
                            type="text"
                            value={storeSettings[settingsModal.storeId]?.dataPath || ''}
                            onChange={(e) => setStoreSettings(prev => ({
                              ...prev,
                              [settingsModal.storeId]: {
                                ...prev[settingsModal.storeId],
                                dataPath: e.target.value
                              }
                            }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Supabase 워크플로우 URL */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Supabase 워크플로우 URL
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="url"
                              value={storeSettings[settingsModal.storeId]?.supabaseUrl || ''}
                              onChange={(e) => setStoreSettings(prev => ({
                                ...prev,
                                [settingsModal.storeId]: {
                                  ...prev[settingsModal.storeId],
                                  supabaseUrl: e.target.value
                                }
                              }))}
                              placeholder="https://supabase.com/workflow/..."
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                            {storeSettings[settingsModal.storeId]?.supabaseUrl && (
                              <a
                                href={storeSettings[settingsModal.storeId].supabaseUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title="워크플로우 열기"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>

                        {/* 자동 실행 설정 */}
                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={storeSettings[settingsModal.storeId]?.autoStart || false}
                              onChange={(e) => setStoreSettings(prev => ({
                                ...prev,
                                [settingsModal.storeId]: {
                                  ...prev[settingsModal.storeId],
                                  autoStart: e.target.checked
                                }
                              }))}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              자동 실행 활성화
                            </span>
                          </label>
                        </div>

                        {/* 자동 실행 설정 */}
                        {storeSettings[settingsModal.storeId]?.autoStart && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                실행 요일
                              </label>
                              <div className="grid grid-cols-7 gap-2">
                                {[
                                  { key: 'mon', label: '월' },
                                  { key: 'tue', label: '화' },
                                  { key: 'wed', label: '수' },
                                  { key: 'thu', label: '목' },
                                  { key: 'fri', label: '금' },
                                  { key: 'sat', label: '토' },
                                  { key: 'sun', label: '일' }
                                ].map(day => (
                                  <label key={day.key} className="flex items-center justify-center">
                                    <input
                                      type="checkbox"
                                      checked={storeSettings[settingsModal.storeId]?.scheduleDays?.[day.key] || false}
                                      onChange={(e) => setStoreSettings(prev => ({
                                        ...prev,
                                        [settingsModal.storeId]: {
                                          ...prev[settingsModal.storeId],
                                          scheduleDays: {
                                            ...prev[settingsModal.storeId].scheduleDays,
                                            [day.key]: e.target.checked
                                          }
                                        }
                                      }))}
                                      className="sr-only peer"
                                    />
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-300 peer-checked:bg-blue-600 peer-checked:border-blue-600 peer-checked:text-white cursor-pointer transition-all">
                                      <span className="text-sm font-medium">{day.label}</span>
                                    </div>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                실행 시간
                              </label>
                              <input
                                type="time"
                                value={storeSettings[settingsModal.storeId]?.scheduleTime || '09:00'}
                                onChange={(e) => setStoreSettings(prev => ({
                                  ...prev,
                                  [settingsModal.storeId]: {
                                    ...prev[settingsModal.storeId],
                                    scheduleTime: e.target.value
                                  }
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                실행 컴퓨터
                              </label>
                              <select
                                value={storeSettings[settingsModal.storeId]?.executionComputer || 'ANN PC'}
                                onChange={(e) => setStoreSettings(prev => ({
                                  ...prev,
                                  [settingsModal.storeId]: {
                                    ...prev[settingsModal.storeId],
                                    executionComputer: e.target.value
                                  }
                                }))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                              >
                                <option value="ANN PC">ANN PC</option>
                                <option value="ROZY PC">ROZY PC</option>
                              </select>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={handleSaveSettings}
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  >
                    저장
                  </button>
                  <button
                    type="button"
                    onClick={() => setSettingsModal({ open: false, storeId: null })}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    취소
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}