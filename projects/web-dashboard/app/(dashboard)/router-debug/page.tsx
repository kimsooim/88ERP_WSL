'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function RouterDebugPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [testPath, setTestPath] = useState('/online/products');

  const navigationMethods = [
    {
      name: 'router.push()',
      action: (path: string) => router.push(path),
      description: 'Client-side navigation'
    },
    {
      name: 'router.replace()',
      action: (path: string) => router.replace(path),
      description: 'Replace current history entry'
    },
    {
      name: 'router.refresh()',
      action: () => router.refresh(),
      description: 'Refresh current route'
    },
    {
      name: 'window.location.href',
      action: (path: string) => window.location.href = path,
      description: 'Hard navigation (full page reload)'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">라우터 디버그 도구</h1>
        <p className="text-gray-600">Next.js 라우터 동작을 테스트하세요</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">현재 상태</h3>
        </div>
        <div className="card-body space-y-2">
          <div>
            <span className="font-medium">현재 경로:</span> 
            <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm">{pathname}</code>
          </div>
          <div>
            <span className="font-medium">브라우저 URL:</span> 
            <code className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm">
              {typeof window !== 'undefined' ? window.location.href : 'N/A'}
            </code>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">네비게이션 테스트</h3>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">테스트 경로</label>
            <input
              type="text"
              value={testPath}
              onChange={(e) => setTestPath(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="/online/products"
            />
          </div>

          <div className="space-y-3">
            {navigationMethods.map((method) => (
              <div key={method.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{method.name}</p>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                <button
                  onClick={() => {
                    console.log(`🚀 Testing ${method.name} with path:`, testPath);
                    method.action(testPath);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                >
                  테스트
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">빠른 링크</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-2 gap-2">
            {[
              '/online',
              '/online/products',
              '/offline',
              '/admin/logs',
              '/mypage/account',
              '/toy',
              '/sales-report',
              '/profit-report'
            ].map((path) => (
              <button
                key={path}
                onClick={() => {
                  console.log('🔗 Quick navigation to:', path);
                  router.push(path);
                }}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm text-left"
              >
                {path}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">콘솔 로그</h3>
        </div>
        <div className="card-body">
          <p className="text-sm text-gray-600">브라우저 개발자 도구의 콘솔을 확인하세요 (F12)</p>
          <button
            onClick={() => {
              console.log('=== Router Debug Info ===');
              console.log('pathname:', pathname);
              console.log('window.location:', window.location);
              console.log('router object:', router);
              console.log('========================');
            }}
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
          >
            디버그 정보 출력
          </button>
        </div>
      </div>
    </div>
  );
}