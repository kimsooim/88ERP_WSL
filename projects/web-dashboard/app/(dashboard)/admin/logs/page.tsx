'use client';

import { useState, useEffect } from 'react';
import { useLog } from '../../../contexts/LogContext';

interface ChangeLog {
  id: string;
  timestamp: string;
  user: string;
  type: 'edit' | 'create' | 'delete' | 'settings';
  category: string;
  target: string;
  field: string;
  oldValue: any;
  newValue: any;
  ip?: string;
}

interface SystemLog {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  service: string;
  message: string;
  details?: string;
}

interface AccessLog {
  id: string;
  timestamp: string;
  user: string;
  action: 'login' | 'logout' | 'session_expired';
  ip: string;
  userAgent?: string;
  success: boolean;
  details?: string;
}

export default function AdminLogsPage() {
  const { changeLogs: realChangeLogs, systemLogs: realSystemLogs, accessLogs: realAccessLogs, getChangeLogs, getSystemLogs, getAccessLogs, addAccessLog } = useLog();
  const [activeTab, setActiveTab] = useState('changes');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [changeLogs, setChangeLogs] = useState<ChangeLog[]>([]);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);
  const [accessLogs, setAccessLogs] = useState<AccessLog[]>([]);

  useEffect(() => {
    // 컴포넌트 마운트 시 로그 불러오기
    const loadedChangeLogs = getChangeLogs();
    const loadedSystemLogs = getSystemLogs();
    const loadedAccessLogs = getAccessLogs();
    setChangeLogs(loadedChangeLogs);
    setSystemLogs(loadedSystemLogs);
    setAccessLogs(loadedAccessLogs);
    
    // 시연용 접속 로그 추가 (초기 한 번만)
    const hasInitialAccessLog = localStorage.getItem('hasInitialAccessLog');
    if (loadedAccessLogs.length === 0 && !hasInitialAccessLog) {
      // 샘플 접속 로그 추가
      addAccessLog({
        user: 'Ann',
        action: 'login',
        ip: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0',
        success: true,
        details: '로그인 성공'
      });
      localStorage.setItem('hasInitialAccessLog', 'true');
    }
  }, []); // 빈 배열로 변경하여 마운트 시 한 번만 실행

  useEffect(() => {
    // 실시간 로그 업데이트
    setChangeLogs(realChangeLogs);
    setSystemLogs(realSystemLogs);
    setAccessLogs(realAccessLogs);
  }, [realChangeLogs, realSystemLogs, realAccessLogs]);

  // 샘플 데이터 (실제 데이터가 없을 때 보여줄 예시)
  const sampleChangeLogs = [
    {
      id: 1,
      timestamp: '2025-07-01 16:45:23',
      user: 'Ann',
      type: 'edit',
      category: '오프라인 자동화',
      target: '에이랜드 (일일매출)',
      field: '제목',
      oldValue: '에이랜드 (일일매출)',
      newValue: '에이랜드 일일매출 보고',
      ip: '192.168.1.100'
    },
    {
      id: 2,
      timestamp: '2025-07-01 16:40:15',
      user: 'Ann',
      type: 'settings',
      category: '오프라인 자동화',
      target: '교보문고 (월말매출)',
      field: '이메일 수신자',
      oldValue: 'ann@88toy.co.kr',
      newValue: 'ann@88toy.co.kr, manager@88toy.co.kr',
      ip: '192.168.1.100'
    },
    {
      id: 3,
      timestamp: '2025-07-01 16:35:10',
      user: 'System',
      type: 'create',
      category: '웹대시보드',
      target: '메모리 파일',
      field: '파일 생성',
      oldValue: null,
      newValue: '2025_07_01_1652_claude_code_multiple_email_recipients.txt',
      ip: '127.0.0.1'
    },
    {
      id: 4,
      timestamp: '2025-07-01 16:30:45',
      user: 'Ann',
      type: 'delete',
      category: '광고관리',
      target: '캠페인 #12345',
      field: '광고 삭제',
      oldValue: '여름 세일 캠페인',
      newValue: null,
      ip: '192.168.1.100'
    },
    {
      id: 5,
      timestamp: '2025-07-01 16:25:33',
      user: 'Rozy',
      type: 'edit',
      category: '상품관리',
      target: 'PROD-2024-001',
      field: '가격',
      oldValue: '25,000원',
      newValue: '23,000원',
      ip: '192.168.1.101'
    }
  ];

  // 시스템 로그 샘플 데이터
  const sampleSystemLogs = [
    {
      id: 1,
      timestamp: '2025-07-01 16:50:00',
      level: 'info',
      service: 'n8n',
      message: '교보문고 일일매출 워크플로우 실행 완료',
      details: '8개 지점 데이터 수집 성공'
    },
    {
      id: 2,
      timestamp: '2025-07-01 16:45:30',
      level: 'error',
      service: 'supabase',
      message: 'Supabase 전송 실패',
      details: 'Connection timeout after 30 seconds'
    },
    {
      id: 3,
      timestamp: '2025-07-01 16:40:00',
      level: 'warning',
      service: 'email',
      message: '이메일 발송 지연',
      details: 'SMTP 서버 응답 속도 저하'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'edit':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'create':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        );
      case 'delete':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        );
      case 'settings':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'edit': return 'text-blue-600 bg-blue-50';
      case 'create': return 'text-green-600 bg-green-50';
      case 'delete': return 'text-red-600 bg-red-50';
      case 'settings': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getLevelColor = (level: string) => {
    switch(level) {
      case 'error': return 'text-red-600 bg-red-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  // 실제 로그와 샘플 데이터 결합
  const displayChangeLogs = changeLogs.length > 0 ? changeLogs : sampleChangeLogs;
  const displaySystemLogs = systemLogs.length > 0 ? systemLogs : sampleSystemLogs;

  const filteredChangeLogs = displayChangeLogs.filter(log => {
    if (selectedFilter === 'all') return true;
    return log.type === selectedFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">로그관리</h1>
          <p className="text-gray-600 mt-1">시스템 로그 및 변경이력을 관리하세요</p>
        </div>
        <button className="btn btn-primary">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          로그 다운로드
        </button>
      </div>

      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('changes')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'changes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            변경이력
          </button>
          <button
            onClick={() => setActiveTab('system')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'system'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            시스템 로그
          </button>
          <button
            onClick={() => setActiveTab('access')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'access'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            접속 로그
          </button>
        </nav>
      </div>

      {/* 필터 섹션 */}
      <div className="card">
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">유형</label>
              <select 
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">전체</option>
                <option value="edit">수정</option>
                <option value="create">생성</option>
                <option value="delete">삭제</option>
                <option value="settings">설정변경</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">시작일</label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">종료일</label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">검색</label>
              <input
                type="text"
                placeholder="사용자, 대상, 내용..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 변경이력 탭 */}
      {activeTab === 'changes' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">변경이력</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    시간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    사용자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    유형
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    카테고리
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    대상
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    변경내용
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredChangeLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{log.user}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(log.type)}`}>
                        {getTypeIcon(log.type)}
                        {log.type === 'edit' && '수정'}
                        {log.type === 'create' && '생성'}
                        {log.type === 'delete' && '삭제'}
                        {log.type === 'settings' && '설정'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.target}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">{log.field}</span>
                        {log.oldValue && log.newValue && (
                          <div className="text-xs mt-1">
                            <span className="text-red-600 line-through">{log.oldValue}</span>
                            <span className="mx-2">→</span>
                            <span className="text-green-600">{log.newValue}</span>
                          </div>
                        )}
                        {!log.oldValue && log.newValue && (
                          <div className="text-xs mt-1 text-green-600">
                            + {log.newValue}
                          </div>
                        )}
                        {log.oldValue && !log.newValue && (
                          <div className="text-xs mt-1 text-red-600">
                            - {log.oldValue}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 시스템 로그 탭 */}
      {activeTab === 'system' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">시스템 로그</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    시간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    레벨
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    서비스
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    메시지
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상세
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displaySystemLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(log.level)}`}>
                        {log.level.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.service}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {log.message}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 접속 로그 탭 */}
      {activeTab === 'access' && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">접속 로그</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    시간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    사용자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP 주소
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    브라우저
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상세
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {accessLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{log.user}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        log.action === 'login' ? 'bg-green-100 text-green-800' :
                        log.action === 'logout' ? 'bg-gray-100 text-gray-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {log.action === 'login' && '로그인'}
                        {log.action === 'logout' && '로그아웃'}
                        {log.action === 'session_expired' && '세션 만료'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.ip}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="truncate max-w-xs" title={log.userAgent}>
                        {log.userAgent ? (
                          log.userAgent.includes('Chrome') ? 'Chrome' :
                          log.userAgent.includes('Firefox') ? 'Firefox' :
                          log.userAgent.includes('Safari') ? 'Safari' :
                          log.userAgent.includes('Edge') ? 'Edge' :
                          'Other'
                        ) : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        log.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {log.success ? '성공' : '실패'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {log.details || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}