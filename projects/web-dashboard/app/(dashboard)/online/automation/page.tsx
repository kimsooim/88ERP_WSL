'use client';

import { useState } from 'react';
import { FiSettings, FiPlay, FiPause, FiClock, FiCheck, FiAlertCircle } from 'react-icons/fi';

interface AutomationTask {
  id: string;
  name: string;
  description: string;
  status: '실행중' | '중지' | '대기' | '오류';
  lastRun: string;
  nextRun: string;
  frequency: string;
  successRate: number;
}

export default function AutomationPage() {
  const [tasks] = useState<AutomationTask[]>([
    {
      id: '1',
      name: '재고 부족 알림',
      description: '재고가 10개 이하로 떨어지면 자동으로 알림 발송',
      status: '실행중',
      lastRun: '2025-06-30 09:00',
      nextRun: '2025-07-01 09:00',
      frequency: '매일',
      successRate: 98.5
    },
    {
      id: '2',
      name: '주문 데이터 동기화',
      description: '각 채널의 주문 데이터를 자동으로 수집하여 동기화',
      status: '실행중',
      lastRun: '2025-06-30 14:30',
      nextRun: '2025-06-30 16:30',
      frequency: '2시간마다',
      successRate: 99.2
    },
    {
      id: '3',
      name: '매출 리포트 생성',
      description: '일일 매출 리포트를 자동 생성하여 이메일 발송',
      status: '실행중',
      lastRun: '2025-06-30 18:00',
      nextRun: '2025-07-01 18:00',
      frequency: '매일',
      successRate: 97.8
    },
    {
      id: '4',
      name: '상품 가격 모니터링',
      description: '경쟁사 가격을 모니터링하여 가격 변동 알림',
      status: '중지',
      lastRun: '2025-06-29 12:00',
      nextRun: '-',
      frequency: '6시간마다',
      successRate: 85.3
    },
    {
      id: '5',
      name: '고객 세그먼트 업데이트',
      description: '고객 구매 패턴 분석하여 세그먼트 자동 업데이트',
      status: '오류',
      lastRun: '2025-06-30 06:00',
      nextRun: '2025-07-01 06:00',
      frequency: '매일',
      successRate: 92.1
    }
  ]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '실행중': return 'badge-success';
      case '중지': return 'badge-warning';
      case '대기': return 'badge-info';
      case '오류': return 'badge-danger';
      default: return 'badge-info';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '실행중': return <FiPlay className="w-4 h-4 text-green-600" />;
      case '중지': return <FiPause className="w-4 h-4 text-yellow-600" />;
      case '대기': return <FiClock className="w-4 h-4 text-blue-600" />;
      case '오류': return <FiAlertCircle className="w-4 h-4 text-red-600" />;
      default: return <FiClock className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">자동화</h1>
        <p className="text-gray-600 mt-1">온라인 비즈니스 자동화 작업을 관리하세요</p>
      </div>

      {/* 자동화 통계 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="summary-card">
          <h3 className="summary-card-title">전체 작업</h3>
          <div className="summary-card-value">{tasks.length}개</div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">실행중</h3>
          <div className="summary-card-value text-success">
            {tasks.filter(t => t.status === '실행중').length}개
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">평균 성공률</h3>
          <div className="summary-card-value">
            {Math.round(tasks.reduce((sum, t) => sum + t.successRate, 0) / tasks.length)}%
          </div>
        </div>
        <div className="summary-card">
          <h3 className="summary-card-title">오류 작업</h3>
          <div className="summary-card-value text-danger">
            {tasks.filter(t => t.status === '오류').length}개
          </div>
        </div>
      </div>

      {/* 자동화 작업 목록 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">자동화 작업 목록</h3>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {getStatusIcon(task.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900">{task.name}</h4>
                      <span className={`badge ${getStatusBadge(task.status)}`}>
                        {task.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">실행 주기:</span>
                        <div className="font-medium">{task.frequency}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">마지막 실행:</span>
                        <div className="font-medium">{task.lastRun}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">다음 실행:</span>
                        <div className="font-medium">{task.nextRun}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">성공률:</span>
                        <div className="font-medium text-green-600">{task.successRate}%</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50">
                    <FiSettings className="w-4 h-4" />
                  </button>
                  <button className={`p-2 rounded-lg ${
                    task.status === '실행중' 
                      ? 'text-yellow-600 hover:text-yellow-800 hover:bg-yellow-50' 
                      : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                  }`}>
                    {task.status === '실행중' ? <FiPause className="w-4 h-4" /> : <FiPlay className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 자동화 성과 및 로그 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 작업별 성공률 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">작업별 성공률</h3>
          </div>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{task.name}</span>
                  <span>{task.successRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      task.successRate >= 95 ? 'bg-green-500' :
                      task.successRate >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${task.successRate}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 최근 활동 로그 */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">최근 활동 로그</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <FiCheck className="w-4 h-4 text-green-600" />
              <div className="flex-1">
                <div className="text-sm font-medium text-green-900">주문 데이터 동기화 완료</div>
                <div className="text-xs text-green-600">2025-06-30 14:30 - 125건 동기화</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <FiCheck className="w-4 h-4 text-green-600" />
              <div className="flex-1">
                <div className="text-sm font-medium text-green-900">재고 부족 알림 발송</div>
                <div className="text-xs text-green-600">2025-06-30 09:00 - 3개 제품 알림</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-200">
              <FiAlertCircle className="w-4 h-4 text-red-600" />
              <div className="flex-1">
                <div className="text-sm font-medium text-red-900">고객 세그먼트 업데이트 실패</div>
                <div className="text-xs text-red-600">2025-06-30 06:00 - DB 연결 오류</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <FiCheck className="w-4 h-4 text-green-600" />
              <div className="flex-1">
                <div className="text-sm font-medium text-green-900">매출 리포트 생성 완료</div>
                <div className="text-xs text-green-600">2025-06-29 18:00 - 이메일 발송 완료</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 새 자동화 작업 추가 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">새 자동화 작업 추가</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
            <FiSettings className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <div className="font-medium text-gray-700">데이터 동기화</div>
            <div className="text-sm text-gray-500">채널 간 데이터 자동 동기화</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
            <FiClock className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <div className="font-medium text-gray-700">스케줄 작업</div>
            <div className="text-sm text-gray-500">정기적인 업무 자동화</div>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center">
            <FiAlertCircle className="w-6 h-6 text-gray-400 mx-auto mb-2" />
            <div className="font-medium text-gray-700">알림 설정</div>
            <div className="text-sm text-gray-500">조건별 자동 알림 발송</div>
          </button>
        </div>
      </div>
    </div>
  );
}