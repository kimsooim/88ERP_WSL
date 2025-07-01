'use client';
import Link from 'next/link'
import { useEffect, useState } from 'react';

interface SystemStatus {
  notion: { success: boolean; message?: string; error?: string };
  database: { success: boolean; message?: string; error?: string };
  status: 'ok' | 'error';
}

interface DashboardStats {
  totalOrders: number;
  completedOrders: number;
  inProgressOrders: number;
  monthlyRevenue: number;
  completionRate: number;
}

export default function HomePage() {
  const [system, setSystem] = useState<SystemStatus | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [sysRes, statsRes] = await Promise.all([
          fetch('/api/system/status').then(r => r.json()),
          fetch('/api/dashboard/stats').then(r => r.json()),
        ]);
        setSystem(sysRes);
        setStats(statsRes.data || null);
      } catch (e) {
        setSystem(null);
        setStats(null);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="px-4 sm:px-0">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          88ERP에 오신 것을 환영합니다
        </h1>
        <p className="text-lg text-gray-600">
          88TOY OEM 제조 관리 통합 대시보드
        </p>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">총 주문</p>
              <p className="text-2xl font-bold text-gray-900">{loading || !stats ? '--' : stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">완료된 작업</p>
              <p className="text-2xl font-bold text-gray-900">{loading || !stats ? '--' : stats.completedOrders}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">진행 중</p>
              <p className="text-2xl font-bold text-gray-900">{loading || !stats ? '--' : stats.inProgressOrders}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">이번 달 매출</p>
              <p className="text-2xl font-bold text-gray-900">{loading || !stats ? '--' : stats.monthlyRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">빠른 작업</h3>
          <div className="space-y-3">
            <Link href="/dashboard" className="btn-primary block text-center">
              대시보드 보기
            </Link>
            <Link href="/orders/new" className="btn-secondary block text-center">
              새 주문 등록
            </Link>
            <Link href="/production" className="btn-secondary block text-center">
              생산 현황 확인
            </Link>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">시스템 정보</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Notion 연동:</span>
              <span className={system?.notion?.success ? 'text-green-600' : 'text-red-600'}>
                {system?.notion?.success ? '정상' : (system?.notion?.error || '오류')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>NAS 연결:</span>
              <span className={system?.database?.success ? 'text-green-600' : 'text-red-600'}>
                {system?.database?.success ? '정상' : (system?.database?.error || '오류')}
              </span>
            </div>
            <div className="flex justify-between">
              <span>자동 업데이트:</span>
              <span className="text-green-600">활성화됨</span>
            </div>
            <div className="flex justify-between">
              <span>버전:</span>
              <span>v0.1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Message */}
      {system?.status !== 'ok' && (
        <div className="card bg-blue-50 border-blue-200">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                시스템 설정이 필요합니다
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Notion API 및 NAS 연동 설정을 완료하여 전체 기능을 사용하세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}