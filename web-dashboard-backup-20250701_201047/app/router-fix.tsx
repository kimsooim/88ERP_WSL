'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function RouterFix() {
  const router = useRouter();
  const pathname = usePathname();
  const [navigationHistory, setNavigationHistory] = useState<string[]>([]);

  useEffect(() => {
    setNavigationHistory(prev => [...prev, pathname]);
  }, [pathname]);

  const testRoutes = [
    '/online',
    '/online/products',
    '/online/orders',
    '/offline',
    '/admin/logs',
    '/admin/users',
    '/mypage/account'
  ];

  const handleProgrammaticNavigation = (path: string) => {
    console.log(`Navigating to: ${path}`);
    router.push(path);
  };

  const handleRefresh = () => {
    router.refresh();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Router Debug Tool</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">현재 경로:</h3>
        <p className="bg-gray-100 p-2 rounded">{pathname}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Link 컴포넌트 테스트:</h3>
        <div className="grid grid-cols-2 gap-2">
          {testRoutes.map(route => (
            <Link
              key={route}
              href={route}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center"
            >
              Link to {route}
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">router.push() 테스트:</h3>
        <div className="grid grid-cols-2 gap-2">
          {testRoutes.map(route => (
            <button
              key={route}
              onClick={() => handleProgrammaticNavigation(route)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Push to {route}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <button
          onClick={handleRefresh}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          router.refresh()
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">네비게이션 히스토리:</h3>
        <ul className="bg-gray-100 p-2 rounded space-y-1">
          {navigationHistory.map((path, index) => (
            <li key={index} className="text-sm">
              {index + 1}. {path}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}